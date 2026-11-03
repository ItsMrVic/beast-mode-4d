#!/usr/bin/env python3
from pathlib import Path
p=Path("index.html")
s=p.read_text(encoding="utf-8")
def replace(old,new):
 global s
 assert s.count(old)==1, f"Expected one occurrence, found {s.count(old)}: {old[:80]}"
 s=s.replace(old,new,1)
replace("<title>Beast Mode 4D v4.20 — Match History</title>","<title>Beast Mode 4D v4.21 — Stability Update</title>")
replace('<span class="ver">v4.20</span>','<span class="ver">v4.21</span>')
replace("return entry.subOperator===operator||entry.operator===operator||\n    ((entry.operator==='SNIPER'||entry.operator==='ORACLE_SNIPER')&&!entry.subOperator);","if(operator==='UNASSIGNED')return !historyEntryTargetOperator(entry);\n  return historyEntryTargetOperator(entry)===operator;")
replace('<option value="DAMACAI"${histOperator===\'DAMACAI\'?\' selected\':\'\'}>Da Ma Cai</option>','<option value="DAMACAI"${histOperator===\'DAMACAI\'?\' selected\':\'\'}>Da Ma Cai</option>\n        <option value="UNASSIGNED"${histOperator===\'UNASSIGNED\'?\' selected\':\'\'}>Cross-operator / unassigned</option>')
replace("if(!date||t3.some(n=>!is4D(n))){alert('Fill in date and top 3 prizes');return;}","if(!date||t3.some(n=>!is4D(n))){alert('Fill in date and top 3 prizes');return;}\n  if(sp.length!==10||cn.length!==10){alert('A complete board of 3 top, 10 Special and 10 Consolation prizes is required before a final check.');return;}")
replace("moduleWeights={...DEFAULT_WEIGHTS};moduleToggles={...DEFAULT_TOGGLES};moduleTogglesPerOp={};\n      stats=","const plain=v=>v&&typeof v==='object'&&!Array.isArray(v);\n      moduleWeights=plain(data.moduleWeights)?{...DEFAULT_WEIGHTS,...Object.fromEntries(Object.entries(data.moduleWeights).filter(([k,v])=>Object.hasOwn(DEFAULT_WEIGHTS,k)&&Number.isFinite(v)&&v>=0))}:{...DEFAULT_WEIGHTS};\n      moduleToggles=plain(data.moduleToggles)?{...DEFAULT_TOGGLES,...Object.fromEntries(Object.entries(data.moduleToggles).filter(([k,v])=>Object.hasOwn(DEFAULT_TOGGLES,k)&&typeof v==='boolean'))}:{...DEFAULT_TOGGLES};\n      moduleTogglesPerOp={};\n      if(plain(data.moduleTogglesPerOp))for(const op of ['MAGNUM','TOTO','DAMACAI'])if(plain(data.moduleTogglesPerOp[op]))moduleTogglesPerOp[op]={...moduleToggles,...Object.fromEntries(Object.entries(data.moduleTogglesPerOp[op]).filter(([k,v])=>Object.hasOwn(DEFAULT_TOGGLES,k)&&typeof v==='boolean'))};\n      stats=")
replace("const data={version:'4.20',exported:","const data={version:'4.21',exported:")
p.write_text(s,encoding="utf-8")
print("Patched index.html",len(s))
