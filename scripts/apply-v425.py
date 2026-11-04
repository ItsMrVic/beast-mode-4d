from pathlib import Path
p=Path('index.html');s=p.read_text()
anchor='function renderLive(){'
assert s.count(anchor)==1
s=s.replace(anchor,anchor+"""
  // v4.25 evaluation lab: optional, isolated from the existing prediction engines.
""",1)
needle='  h+=manualResultsPanelHTML();'
assert s.count(needle)==1
s=s.replace(needle,needle+"""
  h+='<a href="./evaluation-lab.html" style="display:block;text-align:center;padding:12px;margin:8px 0 14px;border:1px solid #8b6a38;border-radius:9px;color:#ffce73;text-decoration:none;font-weight:700">📊 v4.25 Evaluation Lab · Backtest & Ticket Ledger</a>';
""",1)
s=s.replace('v4.24','v4.25')
p.write_text(s)
