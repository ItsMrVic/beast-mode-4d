#!/usr/bin/env python3
"""Add validated manual results entry to Live; preserve saved user data."""
from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
anchor='function renderLive(){'
assert s.count(anchor)==1
helper=r'''
// v4.24: Manual verified-board entry is a local user action, never a provider claim.
function toggleManualResults(){
  const panel=document.getElementById('manualResultsPanel');
  if(panel)panel.hidden=!panel.hidden;
}
function manualResultInputs(prefix,title){
  return '<div style="font-size:11px;font-weight:800;margin:12px 0 6px">'+title+'</div>'+
    '<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px">'+
    Array.from({length:10},(_,i)=>'<label style="font-size:9px;color:var(--dim2)">'+(i+1)+
    '<input id="manual'+prefix+i+'" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="0000" '+
    'style="width:100%;box-sizing:border-box;font-family:monospace;font-size:13px;padding:9px 4px;margin-top:3px;text-align:center"></label>').join('')+'</div>';
}
function manualResultsPanelHTML(){
  const today=malaysiaDateISO();
  const d=liveDate&&liveDate<=today?liveDate:today;
  return '<div style="margin:10px 0 16px">'+
    '<button class="btn btn-outline" style="width:100%;padding:12px" onclick="toggleManualResults()">✍️ Enter Results Manually</button>'+
    '<div id="manualResultsPanel" hidden class="card" style="padding:14px;margin-top:10px">'+
    '<div style="font-size:13px;font-weight:800;margin-bottom:8px">✍️ Manual 4D Results</div>'+
    '<div style="font-size:10px;color:var(--dim2);margin-bottom:12px">Enter a complete board from an official source. Data stays on this device until you export it.</div>'+
    '<label style="font-size:10px">Operator<select id="manualOp" style="width:100%;margin-top:4px">'+
    ['MAGNUM','TOTO','DAMACAI'].map(o=>'<option value="'+o+'">'+o+'</option>').join('')+'</select></label>'+
    '<label style="font-size:10px;display:block;margin-top:10px">Draw date<input id="manualDate" type="date" max="'+today+'" value="'+d+'" style="width:100%;box-sizing:border-box;margin-top:4px"></label>'+
    '<div style="font-size:11px;font-weight:800;margin:12px 0 6px">Top 3 prizes</div>'+
    '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px">'+
    ['1st','2nd','3rd'].map((label,i)=>'<label style="font-size:10px">'+label+
    '<input id="manualTop'+i+'" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" placeholder="0000" style="width:100%;box-sizing:border-box;font-family:monospace;font-size:16px;padding:10px 5px;margin-top:4px;text-align:center"></label>').join('')+'</div>'+
    manualResultInputs('Sp','Special prizes')+manualResultInputs('Cn','Consolation prizes')+
    '<button class="btn btn-red" style="width:100%;margin-top:16px;padding:12px" onclick="saveManualResults()">💾 Save Complete Results</button>'+
    '</div></div>';
}
function saveManualResults(){
  const opName=document.getElementById('manualOp')?.value;
  const date=document.getElementById('manualDate')?.value;
  const op=operators.find(o=>o.name===opName);
  if(!op||!date||!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)||date>malaysiaDateISO()){
    alert('Select an operator and a valid draw date (not in the future).');return;
  }
  const top3=Array.from({length:3},(_,i)=>(document.getElementById('manualTop'+i)?.value||'').trim());
  const special=Array.from({length:10},(_,i)=>(document.getElementById('manualSp'+i)?.value||'').trim());
  const consolation=Array.from({length:10},(_,i)=>(document.getElementById('manualCn'+i)?.value||'').trim());
  const board=[...top3,...special,...consolation];
  if(board.some(n=>!is4D(n))){
    alert('Enter all 23 winning numbers as exactly four digits, including leading zeros.');return;
  }
  if(new Set(board).size!==23){
    alert('Duplicate numbers found in this result board. Please check against the official results.');return;
  }
  const existing=op.draws.find(d=>d.date===date);
  if(existing&&!confirm('A '+opName+' draw already exists for '+date+'. Replace its saved results?'))return;
  if(!confirm('Save '+opName+' results for '+date+'? Please confirm these 23 numbers match the official result board.'))return;
  const day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(date+'T00:00:00Z').getUTCDay()];
  const record={date,day,top3,special,consolation,source:'manual-entry'};
  op.draws=op.draws.filter(d=>d.date!==date);
  op.draws.push(record);
  op.draws.sort((a,b)=>b.date.localeCompare(a.date));
  saveAll();
  liveDate=date;
  liveResults=null;
  render();
  fetchLiveResults();
  toast('✅ '+opName+' results saved. Check prediction history for this draw.');
}
'''
s=s.replace(anchor,helper+'\n'+anchor,1)
old='  if(!liveResults){\n    h+='
assert s.count(old)==1, f'live insertion anchor count {s.count(old)}'
s=s.replace(old,'  h+=manualResultsPanelHTML();\n  if(!liveResults){\n    h+=',1)
# Accurate notice: published results feed is optional and may not be up to date.
s=s.replace('New draws are not downloaded automatically.','New draws may require a feed sync or manual entry.')
# Increment app version labels only, retaining archive labels.
s=s.replace('v4.23','v4.24')
p.write_text(s,encoding='utf-8')
print('Manual entry patched',len(s))
