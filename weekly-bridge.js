/* BEAST MODE 4D v4.30: read-only bridge for existing v4.29 operator data. */
(function(root){'use strict';
const NAMES={MAGNUM:'Magnum',TOTO:'Toto',DAMACAI:'Da Ma Cai'};
function convert(ops){
 if(!Array.isArray(ops))throw Error('Expected operator array');
 const rows=[],issues=[];
 for(const op of ops){const operator=NAMES[String(op.name||'').toUpperCase()];if(!operator){issues.push('Unknown operator');continue;}
 for(const d of op.draws||[]){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d.date||'')){issues.push(operator+': invalid date');continue;}
  const numbers=[...(d.top3||[]),...(d.special||[]),...(d.consolation||[])].filter(n=>/^\d{4}$/.test(String(n)));
  if(!numbers.length){issues.push(operator+' '+d.date+': no valid numbers');continue;}
  const explicit=d.drawType==='special'||d.isSpecial===true;
  const tentative=!explicit&&d.day==='Tue';
  const type=explicit||tentative?'special':'regular';
  const source=tentative?'Existing local archive; Tuesday inferred (unverified event type)':'Existing local operator archive (verification not established)';
  rows.push({operator,date:d.date,type,numbers,source});
 }}
 return {rows,issues};
}
function inspect(ops,engine,operator,cutoff){
 if(!engine||typeof engine.createMonitor!=='function')throw Error('Missing weekly intelligence engine');
 const {rows,issues}=convert(ops),monitor=engine.createMonitor();
 let imported=0;
 for(const row of rows){try{if(monitor.ingest(row).added)imported++;}catch(e){issues.push(row.operator+' '+row.date+': '+e.message);}}
 const snapshot=monitor.snapshot(operator,cutoff,new Date().toISOString());
 return {imported,issues,snapshot,events:monitor.draws().filter(d=>d.operator===operator&&d.date<=cutoff).sort((a,b)=>b.date.localeCompare(a.date))};
}
const api=Object.freeze({convert,inspect});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
else root.BeastWeeklyBridge=api;
})(typeof globalThis!=='undefined'?globalThis:this);
