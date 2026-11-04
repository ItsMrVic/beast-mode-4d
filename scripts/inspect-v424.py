from pathlib import Path
import re
s=Path('index.html').read_text()
patterns=['function renderLive','function renderData','function saveAll','function check','function render(','function import','function is4D','autoFetchResults','operators=','const operators','function renderHistory']
out=[]
for p in patterns:
 hits=[m.start() for m in re.finditer(re.escape(p),s)]
 out.append('\n### '+p+' count '+str(len(hits)))
 for pos in hits[:3]:
  out.append(s[max(0,pos-300):pos+2100])
Path('scripts/v424-inspect.txt').write_text('\n'.join(out)[:28000])
