/* BEAST MODE 4D v4.40 — archived iBOX hit-frequency research.
   All rates are retrospective; never display them as predictive win probabilities. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const bridge=window.B4D_IBOX715_BRIDGE;
if(!bridge||!$('hotArchive'))return;
const STORE='b4d-ibox715-hit-history-v1',WATCH='b4d-ibox715-watchlist-v1';
const operators=['MAGNUM','TOTO','DAMACAI'];
const labels={MAGNUM:'Magnum',TOTO:'Sports Toto',DAMACAI:'Da Ma Cai'};
const sig=s=>String(s).padStart(4,'0').split('').sort().join('');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const pct=n=>(n*100).toFixed(2)+'%';
const groups=bridge.getGroups(),groupsByKey=new Map(groups.map(g=>[g.key,g]));
const archive=new Map();
let savedCount=0,storageMessage='',statRows=[],currentSummary=null,filter='hot',page=0,watchlist=null;
const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d);
const keyOf=e=>e.date+'|'+e.op;
function fromBoard(b){
 if(!b||!operators.includes(b.op)||!validDate(b.date))return null;
 if(!Array.isArray(b.top3)||b.top3.length!==3||!Array.isArray(b.special)||b.special.length!==10||!Array.isArray(b.consolation)||b.consolation.length!==10)return null;
 const numbers=[...b.top3,...b.special,...b.consolation];
 if(!numbers.every(n=>/^\d{4}$/.test(String(n))))return null;
 return{date:b.date,op:b.op,keys:numbers.map(sig),source:String(b.source||'Stored complete results').slice(0,80)};
}
function validArchive(e){
 return e&&validDate(e.date)&&operators.includes(e.op)&&Array.isArray(e.keys)&&e.keys.length===23&&e.keys.every(k=>typeof k==='string'&&groupsByKey.has(k));
}
function load(){
 try{
  const raw=JSON.parse(localStorage.getItem(STORE)||'[]');
  if(Array.isArray(raw))for(const v of raw)if(validArchive(v))archive.set(keyOf(v),v);
  watchlist=JSON.parse(localStorage.getItem(WATCH)||'null');
 }catch(err){storageMessage='Could not read the existing hit archive: '+err.message}
}
function persist(){
 try{
  localStorage.setItem(STORE,JSON.stringify([...archive.values()].sort((a,b)=>a.date.localeCompare(b.date)||a.op.localeCompare(b.op))));
  savedCount=archive.size;
  storageMessage='';
 }catch(err){storageMessage='Storage full or restricted. New draw records are available in this session but were not saved: '+err.message}
}
function ingest(boards){
 if(!Array.isArray(boards))return;
 let changed=false;
 for(const b of boards){
  const v=fromBoard(b);
  if(!v)continue;
  const k=keyOf(v),prior=archive.get(k);
  if(!prior||prior.keys.join(',')!==v.keys.join(',')){
   archive.set(k,v);changed=true;
  }
 }
 if(changed)persist();
}
function sample(){
 const ops=bridge.getSelectedOps(),through=$('hotThrough').value||bridge.getDate();
 const limit=$('hotWindow').value==='all'?Infinity:Number($('hotWindow').value);
 const threshold=Math.max(0,Math.min(100,Number($('hotThreshold').value)));
 const eligible=[...archive.values()].filter(r=>ops.includes(r.op)&&r.date<=through).sort((a,b)=>b.date.localeCompare(a.date)||a.op.localeCompare(b.op));
 const dates=[...new Set(eligible.map(x=>x.date))].slice(0,limit);
 const included=new Set(dates),observations=eligible.filter(x=>included.has(x.date));
 const hits=new Map(groups.map(g=>[g.key,{drawHits:0,prizePositions:0,dates:[],operators:new Set()}]));
 for(const board of observations){
  const counts=new Map();
  for(const group of board.keys)counts.set(group,(counts.get(group)||0)+1);
  for(const [group,positions] of counts){
   const row=hits.get(group);
   row.drawHits++;row.prizePositions+=positions;
   row.operators.add(board.op);
   row.dates.push(board.date+' '+labels[board.op]);
  }
 }
 const n=observations.length;
 const rows=groups.map(g=>{
  const hit=hits.get(g.key),observed=n?hit.drawHits/n:0,baseline=23*g.perms/10000;
  return{key:g.key,perms:g.perms,hitDraws:hit.drawHits,prizePositions:hit.prizePositions,observed,baseline,dates:hit.dates.slice(0,8),hot:n>=30&&observed*100>=threshold};
 });
 rows.sort((a,b)=>b.observed-a.observed||b.hitDraws-a.hitDraws||a.key.localeCompare(b.key));
 return{ops,through,limit,dates,boards:observations,threshold,rows,hot:rows.filter(r=>r.hot),n};
}
function render(){
 const s=sample();currentSummary=s;statRows=s.rows;
 const noHistory=s.n===0;
 $('hotStatus').textContent=(archive.size)+' unique operator-draw records archived locally; '+s.n+' included before/on '+s.through+' across '+s.dates.length+' draw dates. '+(storageMessage||'New complete results are added without double counting.');
 $('hotMetrics').innerHTML='<div class="metric"><small>Archived operator-draws</small><b>'+archive.size+'</b></div>'+
 '<div class="metric"><small>Study sample</small><b>'+s.n+'</b></div>'+
 '<div class="metric"><small>Hit rate ≥ '+s.threshold+'%</small><b>'+s.hot.length+'</b></div>'+
 '<div class="metric"><small>Below threshold / not qualified</small><b>'+(715-s.hot.length)+'</b></div>';
 $('hotWarning').textContent=noHistory?
 'No completed historical records for this selection yet. Open the Live tab, import your backup, or wait for checked results.':
 s.n<30?'Only '+s.n+' operator-draw observations available; at least 30 are required before an automatic high-frequency shortlist is formed. These observations cannot establish future winning odds.':
 'Historical hit frequency is hits ÷ completed operator-draws, not the chance of winning the next draw. A 24-way set covers more outcomes than a 4-way set, so raw hit rates are not directly comparable. The fair-draw reference rate is shown for each set.';
 $('hotSave').disabled=!s.hot.length||s.n<30;
 $('hotDownload').disabled=noHistory;
 const selected=filter==='hot'?s.rows.filter(r=>r.hot):filter==='rare'?s.rows.filter(r=>!r.hot):filter==='hit'?s.rows.filter(r=>r.hitDraws>0):s.rows;
 const search=$('hotSearch').value.replace(/\D/g,'').slice(0,4);
 const rows=selected.filter(r=>!search||(search.length===4?r.key===sig(search):r.key.includes(search)));
 const pages=Math.max(1,Math.ceil(rows.length/60));page=Math.min(page,pages-1);
 $('hotListInfo').textContent=rows.length+' sets · '+(filter==='hot'?'high-frequency study group':filter==='rare'?'below cutoff or insufficient history':filter==='hit'?'ever matched a prize':'all 715')+'.';
 $('hotList').innerHTML=rows.slice(page*60,(page+1)*60).map(r=>
 '<article class="group '+(r.hot?'win':r.hitDraws?'':'no-prize')+'"><div class="name">'+r.key+'</div>'+
 '<div class="sub">'+r.perms+'-way · '+r.hitDraws+'/'+s.n+' draw boards · '+r.prizePositions+' prize positions</div>'+
 '<div class="'+(r.hot?'wintext':'sub')+'">Historical: '+pct(r.observed)+'</div>'+
 '<div class="sub">Fair-draw reference: '+pct(r.baseline)+' per operator-draw</div>'+
 (r.dates.length?'<div class="sub">Recent matches: '+r.dates.slice(0,2).map(escape).join('; ')+'</div>':'')+
 '</article>'
 ).join('')||'<p class="muted">No sets in this category for the selected sample and threshold.</p>';
 $('hotPageInfo').textContent=(page+1)+' / '+pages;
 $('hotPrev').disabled=page===0;$('hotNext').disabled=page>=pages-1;
 if(watchlist&&Array.isArray(watchlist.keys)){
  $('hotSaved').textContent='Saved research watchlist: '+watchlist.keys.length+' sets · through '+watchlist.through+' · '+watchlist.sample+' recorded operator-draws · '+watchlist.threshold+'% historical cutoff. Not an automatic bet.';
 }else $('hotSaved').textContent='No watchlist saved. Your historical hit archive saves automatically.';
}
function saveWatchlist(){
 const s=sample();
 if(s.n<30||!s.hot.length)return;
 watchlist={
  version:1,createdAt:new Date().toISOString(),through:s.through,
  sample:s.n,operators:s.ops,window:$('hotWindow').value,threshold:s.threshold,
  keys:s.hot.map(g=>g.key),rates:s.hot.map(g=>({key:g.key,observedPct:Number((g.observed*100).toFixed(3)),hitDraws:g.hitDraws,perms:g.perms}))
 };
 try{localStorage.setItem(WATCH,JSON.stringify(watchlist));render()}catch(e){$('hotSaved').textContent='Unable to save the research watchlist: '+e.message}
}
function downloadCSV(){
 const s=sample();if(!s.n)return;
 const lines=['group,permutations,hit_operator_draws,operator_draws_observed,historical_hit_rate_percent,fair_draw_reference_percent,prize_positions,meets_historical_threshold'];
 for(const x of s.rows)lines.push([x.key,x.perms,x.hitDraws,s.n,(x.observed*100).toFixed(3),(x.baseline*100).toFixed(3),x.prizePositions,x.hot?'yes':'no'].join(','));
 const blob=new Blob([lines.join('\r\n')],{type:'text/csv;charset=utf-8'});
 const url=URL.createObjectURL(blob),anchor=document.createElement('a');
 anchor.href=url;anchor.download='beastmode-715-hotsets-through-'+s.through+'.csv';
 document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function updateOnMainRender(){
 ingest(bridge.getBoards());render();
}
function initialize(){
 load();ingest(bridge.getBoards());
 $('hotThrough').value=bridge.getDate();
 for(const id of ['hotThrough','hotWindow','hotThreshold','hotSearch']){
  $(id).addEventListener(id==='hotSearch'?'input':'change',()=>{page=0;render()});
 }
 document.querySelectorAll('[data-hot-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  filter=btn.dataset.hotFilter;page=0;
  document.querySelectorAll('[data-hot-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===btn)));
  render();
 }));
 $('hotPrev').onclick=()=>{page=Math.max(0,page-1);render()};
 $('hotNext').onclick=()=>{page++;render()};
 $('hotSave').onclick=saveWatchlist;
 $('hotDownload').onclick=downloadCSV;
 render();
}
window.B4D_IBOX_HOT={ingest,render,onMainRender:updateOnMainRender,study:sample,archiveCount:()=>archive.size};
initialize();
})();
