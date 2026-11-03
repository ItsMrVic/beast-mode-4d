#!/usr/bin/env python3
"""Add per-mode prediction snapshots without changing ranking algorithms."""
from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
def replace(old,new):
 global s
 count=s.count(old)
 if count!=1: raise RuntimeError(f'Expected one occurrence, got {count}: {old[:100]}')
 s=s.replace(old,new,1)
helper="""
// v4.23: Persist the actual outputs of each generated mode, not recomputed guesses.
// Existing entries are never overwritten; duplicate runs for the same mode/date/operator are idempotent.
function saveModeHistory(mode,operator,targetDate,targetDay,numbers,meta={}){
  const predictions=[...new Set((Array.isArray(numbers)?numbers:[]).filter(is4D))].slice(0,15);
  if(!predictions.length||!/^\\d{4}-\\d{2}-\\d{2}$/.test(targetDate||''))return false;
  if(history.some(e=>e.operator===mode&&(e.subOperator||null)===(operator||null)&&(e.targetDate||e.date)===targetDate))return false;
  history.push({id:'mode'+Date.now().toString(36)+Math.random().toString(36).slice(2,8),
    date:targetDate,targetDate,targetDay,generatedAt:new Date().toISOString(),
    operator:mode,...(operator?{subOperator:operator}:{}),
    predictions,checked:false,hits:[],permHits:0,
    historySource:'generated-mode',modeMeta:meta});
  return true;
}
"""
replace("function runBeast(){",helper+"\nfunction runBeast(){")
replace("      stats.totalPredictions+=ready.length;","""      // Snapshot the extra modes displayed by Predict, including cross-operator Sniper.
      const cross=crossOperatorFusion(lastResults);
      saveModeHistory('SNIPER',null,targetDate,targetDay,
        cross.playAllOps.slice(0,10).map(p=>p.num),{scope:'cross-operator',notTicketWin:true});
      stats.totalPredictions+=ready.length;""")
replace("      lastOracleResults=results;","""      lastOracleResults=results;
      Object.entries(results).forEach(([opN,res])=>{
        saveModeHistory('DODGE',opN,targetDate,tDay,
          (res.dodgeVariants||[]).slice(0,3).map(v=>v.num),
          {source:'oracle-dodge-variants'});
        saveModeHistory('CROSSOP',opN,targetDate,tDay,
          (res.crossOp?.candidates||[]).slice(0,3).map(c=>c.num),
          {source:'oracle-cross-operator-migration'});
      });
      saveModeHistory('ORACLE_SNIPER',null,targetDate,tDay,
        computeOracleSniper().slice(0,10).map(p=>p.displayNum),
        {scope:'cross-operator',notTicketWin:true});""")
replace("      saveAll();render();toast('🔥 Operator-specific Hot Hand scan complete — exploratory rankings saved.');","""      Object.entries(fusions).forEach(([opN,nums])=>
        saveModeHistory('FUSION',opN,targetDate,tDay,nums,
          {source:'oracle-and-hot-hand',matching:'digit-set'}));
      saveAll();render();toast('🔥 Hot Hand and available Fusion mode snapshots saved.');""")
s=s.replace("v4.22","v4.23")
s=s.replace("version:'4.22'","version:'4.23'")
p.write_text(s,encoding='utf-8')
print('Applied v4.23 history capture',len(s))
