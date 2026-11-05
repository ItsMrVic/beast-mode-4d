/* BEAST MODE 4D v4.30 — read-only weekly analysis UI.
 * Never modifies localStorage, history, prediction weights or operator records.
 */
(function(root){'use strict';
const OPERATOR_NAMES=['Magnum','Toto','Da Ma Cai'];
const OPERATOR_COLORS={'Magnum':'#e0b658','Toto':'#f87171','Da Ma Cai':'#76a9fa'};
function todayMalaysia(){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const get=t=>parts.find(p=>p.type===t).value;
 return get('year')+'-'+get('month')+'-'+get('day');
}
function topDigitShifts(events,windowSize){
 const recent=events.slice(0,windowSize),previous=events.slice(windowSize,windowSize*2);
 if(recent.length<windowSize||previous.length<windowSize)return [];
 function distribution(rows){const counts=Array(10).fill(0);let total=0;
  rows.forEach(d=>d.numbers.forEach(n=>{for(const char of n){counts[Number(char)]++;total++;}}));
  return counts.map(count=>total?count/total:0);
 }
 const a=distribution(recent),b=distribution(previous);
 return a.map((v,i)=>({digit:String(i),difference:Math.round((v-b[i])*1000)/10}))
 .sort((x,y)=>Math.abs(y.difference)-Math.abs(x.difference)).slice(0,5);
}
function latestWednesday(events,cutoff){
 const weds=events.filter(d=>d.date<=cutoff&&new Date(d.date+'T00:00:00Z').getUTCDay()===3);
 if(!weds.length)return null;
 const wed=weds[0];
 const following=events.filter(d=>d.date>wed.date&&d.date<=cutoff).sort((a,b)=>a.date.localeCompare(b.date));
 return {wed,following};
}
function render({operators,today= todayMalaysia()}={}){
 const pg=document.getElementById('pgWeekly');if(!pg)return;
 pg.innerHTML=`<div class="section-title">🐉 WEEKLY INTELLIGENCE · v4.30</div>
 <div class="card" style="border-color:#70522b;background:linear-gradient(145deg,var(--bg3),var(--bg2))">
 <div style="font-size:12px;font-weight:800;color:#e6bc64;margin-bottom:8px">📊 Weekly Pattern Research</div>
 <p style="font-size:11px;line-height:1.55;color:var(--dim2)">Analyze the draw history already saved in your app. This is a read-only research view; it does not change the prediction engine, tickets, saved results or settings. Random patterns do not imply better winning odds.</p>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
 <label style="font-size:10px;color:var(--dim2)">Operator<select id="weeklyOp" style="margin-top:4px"><option>Magnum</option><option>Toto</option><option>Da Ma Cai</option></select></label>
 <label style="font-size:10px;color:var(--dim2)">History through (MYT)<input id="weeklyCutoff" type="date" style="margin-top:4px"></label></div>
 <button id="weeklyRun" class="btn btn-fire" style="width:100%;margin-top:12px">🔍 Analyze Saved Draws</button>
 <div id="weeklyReport" role="status" aria-live="polite" style="margin-top:12px;font-size:11px;line-height:1.6">Choose an operator to begin.</div>
 </div>
 <div class="card"><div style="font-size:12px;font-weight:800;margin-bottom:8px">⭐ Special Draw research</div><p style="font-size:10px;line-height:1.5;color:var(--dim2)">The <b>10 Special prize numbers</b> listed in every regular draw are a prize category, <b>not</b> a separate Special Draw event. Tuesday records without an explicit draw-type flag are treated as <b>tentative</b> Special Draws and must be verified against an official schedule.</p></div>
 <div class="card"><div style="font-size:11px;font-weight:800;margin-bottom:7px">🔒 Research safeguards</div><p style="font-size:10px;line-height:1.5;color:var(--dim2)">History after the selected cutoff is excluded. Results do not include a verified publication timestamp, so same-day retrospective conclusions can still have look-ahead risk. No adaptive ranking is activated without separate chronological tests against a random control.</p></div>`;
 const cutoff=document.getElementById('weeklyCutoff');cutoff.max=today;cutoff.value=today;
 document.getElementById('weeklyRun').onclick=()=>{
  const report=document.getElementById('weeklyReport'),name=document.getElementById('weeklyOp').value,date=cutoff.value;
  if(!OPERATOR_NAMES.includes(name)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>todayMalaysia()){
   report.textContent='Choose a valid date that is not in the future (Malaysia time).';return;
  }
  const engine=root.BeastWeeklyIntelligence,bridge=root.BeastWeeklyBridge;
  if(!engine||!bridge){report.textContent='Research scripts unavailable. Refresh while connected to the internet.';return;}
  try{
   const result=bridge.inspect(operators,engine,name,date),profile=result.snapshot.profile;
   const rows=result.events,specials=rows.filter(d=>d.type==='special');
   const tentative=specials.filter(d=>d.source.includes('Tuesday inferred')).length;
   const shifts=topDigitShifts(rows,12),week=latestWednesday(rows,date);
   const wrapper=document.createElement('div');wrapper.style.color='var(--text)';
   function paragraph(label,value){const p=document.createElement('p');p.style.marginBottom='7px';
    const b=document.createElement('strong');b.textContent=label+': ';p.appendChild(b);p.appendChild(document.createTextNode(String(value)));wrapper.appendChild(p);}
   paragraph('Operator',name);
   paragraph('Historical cutoff',date+' (Malaysia)');
   paragraph('Draws / prize numbers',profile.drawCount.toLocaleString('en-MY')+' / '+profile.numberCount.toLocaleString('en-MY'));
   paragraph('Status',profile.status==='insufficient-data'?'Insufficient data; no reliable pattern detected':'Descriptive statistics only; no demonstrated predictive advantage');
   paragraph('Digit occurrence counts (0–9)',profile.digits.join(' · '));
   paragraph('Average sum of four digits',profile.meanDigitSum==null?'N/A':profile.meanDigitSum.toFixed(2));
   paragraph('Latest Wednesday',week?week.wed.date+' · '+week.wed.numbers.slice(0,3).join(', '):'None in selected history');
   paragraph('Later recorded draws after that Wednesday',week&&week.following.length?week.following.map(d=>d.date).join(', '):'None through selected cutoff');
   paragraph('Recent vs previous 12-draw digit shifts',shifts.length?shifts.map(s=>s.digit+' '+(s.difference>=0?'+':'')+s.difference.toFixed(1)+'pp').join(' · '):'Need at least 24 earlier draws');
   paragraph('Candidate Special Draw events',specials.length+' ('+tentative+' Tuesday-inferred; not independently verified)');
   paragraph('Recent candidate dates',specials.length?specials.slice(0,8).map(d=>d.date).join(', '):'None');
   paragraph('Records requiring review',result.issues.length);
   const note=document.createElement('p');note.style='margin-top:10px;color:var(--dim2);font-size:10px';note.textContent='Count changes between small samples are expected even with independent random draws. No results or stored predictions were modified.';wrapper.appendChild(note);
   report.replaceChildren(wrapper);
  }catch(e){report.textContent='Analysis error: '+e.message;}
 };
}
root.BeastWeeklyUI=Object.freeze({render,todayMalaysia,topDigitShifts,latestWednesday});
})(typeof globalThis!=='undefined'?globalThis:this);
