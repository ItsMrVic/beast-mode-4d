#!/usr/bin/env python3
from pathlib import Path
p=Path('index.html')
s=p.read_text()
old="""async function autoFetchResults(){
  const el=document.getElementById('fetchStatus');
  if(el)el.innerHTML='<div class="fetch-status error">Automated scraping is disabled: loose HTML-number matching can import incorrect results. Use verified operator results manually or import a validated JSON historical dataset.</div>';
  const btn=document.getElementById('fetchBtn');if(btn)btn.disabled=false;
}"""
new="""async function autoFetchResults(silent=false){
  const el=document.getElementById('fetchStatus');
  const btn=document.getElementById('fetchBtn');
  if(btn)btn.disabled=true;
  try{
    const response=await fetch('./data/verified-results.json?t='+Date.now(),{cache:'no-store'});
    if(!response.ok)throw Error('Verified-results feed unavailable (HTTP '+response.status+')');
    const payload=await response.json();
    if(payload.schema!==1||!Array.isArray(payload.draws))throw Error('Unexpected verified-results format');
    const proposed=operators.map(o=>({...o,draws:[...o.draws]}));
    let added=0,conflicts=0,skipped=0;
    for(const row of payload.draws){
      if(!row||row.status!=='checked'||!['MAGNUM','TOTO','DAMACAI'].includes(row.operator)||!/^\\d{4}-\\d{2}-\\d{2}$/.test(row.date||'')||row.date>malaysiaDateISO())continue;
      const draw={date:row.date,day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(row.date+'T00:00:00Z').getUTCDay()],top3:row.top3,special:row.special,consolation:row.consolation};
      if(!validDraw(draw)||!isCompletePrizeBoard(draw))continue;
      const op=proposed.find(o=>o.name===row.operator);
      const existing=op.draws.find(d=>d.date===draw.date);
      if(existing){
        if(JSON.stringify([existing.top3,existing.special,existing.consolation])!==JSON.stringify([draw.top3,draw.special,draw.consolation]))conflicts++;
        else skipped++;
        continue;
      }
      op.draws.push(draw);added++;
    }
    if(added){
      proposed.forEach(o=>o.draws.sort((a,b)=>b.date.localeCompare(a.date)));
      // Commit a single validated snapshot; keep memory unchanged on quota failure.
      localStorage.setItem(KEYS.ops,JSON.stringify(proposed));
      operators=proposed;
    }
    const status='Verified feed: '+added+' new draws, '+skipped+' already stored, '+conflicts+' conflicts kept';
    try{localStorage.setItem('b4d_verified_sync_status',new Date().toISOString()+' — '+status);}catch(ignore){}
    if(el)el.textContent=status+' · Source: 4dlivetoday.com';
    if(!silent)toast(status);
    if(added)render();
    return {added,conflicts,skipped};
  }catch(error){
    if(el)el.textContent='Automatic sync unavailable: '+error.message;
    if(!silent)toast('Results sync unavailable; saved history unchanged');
    console.warn('Verified results sync failed',error);
    return null;
  }finally{if(btn)btn.disabled=false;}
}"""
assert s.count(old)==1,'Expected exact autoFetchResults function'
s=s.replace(old,new,1)
assert s.count('autoSyncBundledHistory();\nrender();')==1
s=s.replace('autoSyncBundledHistory();\nrender();','autoSyncBundledHistory();\nrender();\n// Refresh on launch; scheduled GitHub Actions refreshes the published feed.\nautoFetchResults(true);',1)
assert s.count('v4.21')>=1
s=s.replace('v4.21','v4.22').replace("version:'4.21'","version:'4.22'")
p.write_text(s)
print('Patched app v4.22')
