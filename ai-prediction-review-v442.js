/* BEAST MODE AI Review Gate v4.42
 * Optional, English-only, AI-supported research selection.
 * Preserves all original engine outputs and history, filters DISPLAY only.
 * No AI result is a calibrated winning probability.
 */
(function(){
'use strict';
const STORE='b4d-ai-review-history-v1',PREF='b4d-ai-review-enabled-v1',ENDPOINT='b4d-ai-brain-endpoint-v1';
const is4d=n=>typeof n==='string'&&/^\d{4}$/.test(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const OP=['MAGNUM','TOTO','DAMACAI'];
let enabled=false,token='',backend='',states=new Map(),archive={};
try{enabled=localStorage.getItem(PREF)==='yes';backend=localStorage.getItem(ENDPOINT)||'';archive=JSON.parse(localStorage.getItem(STORE)||'{}')||{}}catch(e){archive={}}
function validEndpoint(raw){
 try{const u=new URL(String(raw||'').trim());return u.protocol==='https:'&&!!u.hostname&&!u.username&&!u.password&&!u.hash&&!u.search?u.origin:''}catch{return''}
}
function safeNum(obj){
 if(typeof obj==='string'&&is4d(obj))return{num:obj,score:0};
 if(!obj||typeof obj!=='object')return null;
 const n=obj.num;
 return is4d(n)?{num:n,score:Number.isFinite(Number(obj.score))?Number(obj.score):0}:null;
}
function normalized(picks){
 return (Array.isArray(picks)?picks:[]).map((p,i)=>{
  const v=Array.isArray(p)&&is4d(p[0])?{num:p[0],score:Number(p[1])||0}:safeNum(p);
  return v?{num:v.num,score:v.score,index:i,raw:p}:null;
 }).filter(Boolean).filter((v,i,a)=>a.findIndex(x=>x.num===v.num)===i).slice(0,20);
}
function identifier(mode,op,date,rows){
 return [mode,op,date,rows.map(x=>x.num+':'+x.score.toFixed(3)).join('|')].join('~');
}
function saveArchive(id,entry){
 archive[id]={...entry,updatedAt:new Date().toISOString()};
 const keys=Object.keys(archive);
 if(keys.length>120)keys.sort((a,b)=>String(archive[b].updatedAt).localeCompare(String(archive[a].updatedAt))).slice(120).forEach(k=>delete archive[k]);
 try{localStorage.setItem(STORE,JSON.stringify(archive))}catch(e){console.warn('AI review archive storage unavailable',e)}
}
function toggle(){
 enabled=!enabled;try{localStorage.setItem(PREF,enabled?'yes':'no')}catch(e){}
 if(typeof render==='function')render();
}
function connect(){
 const url=validEndpoint(document.getElementById('reviewEndpoint')?.value);
 const candidate=(document.getElementById('reviewToken')?.value||'').trim();
 if(!url||candidate.length<24){const el=document.getElementById('reviewSettingsStatus');if(el)el.textContent='Enter the secure backend HTTPS origin and your separate 24+ character access token.';return}
 backend=url;token=candidate;document.getElementById('reviewToken').value='';
 for(const [id,entry] of states)if(entry.status==='needs-setup'||entry.status==='error')states.delete(id);
 try{localStorage.setItem(ENDPOINT,url)}catch(e){}
 if(typeof render==='function')render();
}
function status(mode,op,date,picks){
 const rows=normalized(picks),id=identifier(mode,op,date,rows);
 return states.get(id)||archive[id]||null;
}
function filter(mode,operator,targetDate,picks){
 if(!enabled)return picks;
 if(!OP.includes(operator)||!/^20\d\d-\d\d-\d\d$/.test(targetDate||''))return [];
 const rows=normalized(picks);
 if(!rows.length)return [];
 const id=identifier(mode,operator,targetDate,rows);
 let entry=states.get(id)||archive[id];
 if(!entry){
  if(!validEndpoint(backend)||token.length<24){
   states.set(id,{status:'needs-setup',keep:[],excluded:rows.map(x=>x.num)});
   return [];
  }
  entry={status:'pending',keep:[],excluded:rows.map(x=>x.num),mode,operator,targetDate};states.set(id,entry);
  request(id,mode,operator,targetDate,rows);
  return [];
 }
 if(entry.status!=='done')return [];
 const allowed=new Set(Array.isArray(entry.keep)?entry.keep:[]);
 return rows.filter(r=>allowed.has(r.num)).map(r=>r.raw);
}
function contextFor(operator,targetDate){
 try{
  const op=typeof operators!=='undefined'&&Array.isArray(operators)?operators.find(x=>x.name===operator):null;
  const past=(op&&Array.isArray(op.draws)?op.draws:[]).filter(x=>typeof x.date==='string'&&x.date<targetDate).sort((a,b)=>b.date.localeCompare(a.date));
  return {priorDrawCount:past.length,verifiedPriorDraws:past.slice(0,25).map(x=>({
    date:x.date,top3:Array.isArray(x.top3)?x.top3.slice(0,3):[],
    special:Array.isArray(x.special)?x.special.slice(0,10):[],
    consolation:Array.isArray(x.consolation)?x.consolation.slice(0,10):[]
  }))};
 }catch{return{priorDrawCount:0,verifiedPriorDraws:[]}}
}
async function request(id,mode,operator,targetDate,rows){
 const url=validEndpoint(backend);const secret=token;
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{
  const response=await fetch(url+'/review',{
   method:'POST',
   headers:{'Content-Type':'application/json','Authorization':'Bearer '+secret},
   body:JSON.stringify({mode,operator,targetDate,candidates:rows.map(({num,score})=>({num,score})),context:contextFor(operator,targetDate)}),
   signal:controller.signal
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw Error(data.error||'The secure AI review backend is unavailable.');
  if(!Array.isArray(data.keep))throw Error('Invalid AI review response: missing keep list.');
  const candidates=new Set(rows.map(r=>r.num));
  const keep=[...new Set(data.keep.filter(n=>is4d(n)&&candidates.has(n)))].slice(0,5);
  const excluded=rows.map(x=>x.num).filter(x=>!keep.includes(x));
  const notes=Array.isArray(data.notes)?data.notes.filter(v=>v&&is4d(v.num)&&typeof v.reason==='string').slice(0,5).map(v=>({num:v.num,reason:v.reason.slice(0,180)})):[];
  const record={status:'done',mode,operator,targetDate,keep,excluded,notes,original:rows.map(r=>({num:r.num,score:r.score})),description:String(data.disclaimer||'Ranking comparison only. No demonstrated predictive advantage.').slice(0,220)};
  states.set(id,record);saveArchive(id,record);
 }catch(e){states.set(id,{status:'error',error:e.name==='AbortError'?'The AI review timed out.':String(e.message||e).slice(0,150),keep:[],excluded:rows.map(x=>x.num)});}
 finally{clearTimeout(timer);if(enabled&&typeof render==='function')render();}
}
function controls(){
 const on=enabled;
 return '<section style="border:1px solid #815db0;border-radius:12px;background:#211a35;padding:12px;margin:10px 0;color:#eee">'+
 '<div style="font-size:13px;font-weight:800;color:#dbc2ff;margin-bottom:6px">🧠 AI Prediction Review <span style="font-size:9px;color:#ccb5ec">v4.42 · Experimental</span></div>'+
 '<div style="font-size:10px;color:#cabed8;line-height:1.5;margin-bottom:8px">Optional AI screening of generated research candidates. Reviewed picks are NOT proven more likely to win. Original outputs remain archived; Random Control stays unfiltered for fair comparison.</div>'+
 '<button onclick="B4D_REVIEW.toggle()" style="background:'+(on?'#5c3d85':'#33344a')+';color:white;border:1px solid #9973c2;padding:9px 12px;border-radius:9px;font-weight:700">AI Review '+(on?'ON · Show approved only':'OFF · Show original results')+'</button>'+
 (on?'<div style="font-size:9px;color:#e7c68e;margin-top:8px">Strict display gate: no original numbers appear in reviewed lists until the AI responds successfully. If the API is offline, no reviewed selections are shown.</div>'+
 '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">'+
 '<input id="reviewEndpoint" type="url" placeholder="Secure Worker HTTPS URL" autocomplete="off" value="'+esc(backend)+'" style="min-width:185px;flex:1;color:white;background:#17192e;border:1px solid #615177;padding:10px;border-radius:7px">'+
 '<input id="reviewToken" type="password" autocomplete="off" placeholder="Separate backend access token" style="min-width:185px;flex:1;color:white;background:#17192e;border:1px solid #615177;padding:10px;border-radius:7px">'+
 '<button onclick="B4D_REVIEW.connect()" style="background:#5c3d85;color:white;border:1px solid #9973c2;padding:10px;border-radius:7px">Connect secure reviewer</button></div>'+
 '<div id="reviewSettingsStatus" style="font-size:9px;color:#cdbbdf;margin-top:5px">Access token stays in browser memory only. This AI backend must be deployed first.</div>':'')+
 '<div style="font-size:9px;margin-top:7px"><a href="./ai-brain.html" style="color:#c9a5ff">AI Brain setup and chat</a></div>'+
 '</section>';
}
function banner(mode,operator,targetDate,picks){
 if(!enabled)return '';
 const rows=normalized(picks);if(!rows.length)return '';
 const entry=status(mode,operator,targetDate,picks),prefix='<div style="font-size:9px;color:#d3bfeb;padding:8px;border:1px dashed #655280;border-radius:8px;margin:7px 0">';
 if(!entry||entry.status==='pending')return prefix+'⏳ AI reviewing '+rows.length+' candidate(s) for '+esc(operator)+' · '+esc(mode)+' · '+esc(targetDate)+'…</div>';
 if(entry.status==='needs-setup')return prefix+'🔒 AI Review is ON but not connected. Original candidate numbers are hidden. Connect the secure reviewer above, or switch AI Review OFF.</div>';
 if(entry.status==='error')return prefix+'⚠️ AI review unavailable: '+esc(entry.error||'Unknown error')+'. Original candidate numbers remain hidden. Switch AI Review OFF to see them.</div>';
 const notes=new Map((entry.notes||[]).map(x=>[x.num,x.reason]));
 return prefix+'✅ AI research shortlist: '+entry.keep.length+'/'+rows.length+' displayed. '+entry.excluded.length+' not selected.'+
 (entry.keep.length===0?' No numbers passed this experimental review.':'')+
 '<details style="margin-top:6px"><summary style="cursor:pointer">Review excluded candidates ('+entry.excluded.length+') · saved, not deleted</summary><div style="margin-top:6px;color:#aaa">'+entry.excluded.map(esc).join(', ')+'</div></details>'+
 (entry.keep.length?'<div style="color:#cbb8e0;margin-top:5px">'+entry.keep.map(n=>esc(n)+(notes.has(n)?' — '+esc(notes.get(n)):'')).join('<br>')+'</div>':'')+
 '<div style="color:#e2bf88;margin-top:6px">Review ranking is not a calibrated future winning probability.</div></div>';
}
window.B4D_REVIEW={enabled:()=>enabled,toggle,connect,controls,filter,banner,status};
})();