from pathlib import Path
import re
t=Path('index.html').read_text()
out=[]
for key in ['function saveDraw(){','function checkResults(){','function renderLive(){','function autoFetchResults(','function importVerified','function checkDuplicate(']:
 pos=t.find(key)
 out.append('### '+key+' at '+str(pos))
 if pos<0:continue
 if key=='function renderLive(){':
  # Strip huge inline base64 logos from diagnostic.
  sub=t[pos:pos+85000]
  sub=re.sub(r'data:image/[^\x60\x27\x22 ]+', '[BASE64_LOGO]',sub)
  for needle in ['Check DB','Merge archive','liveDate','pg.innerHTML','saveDraw','Manual']:
   ix=sub.find(needle)
   out.append('NEEDLE '+needle+' '+str(ix)+'\n'+(sub[max(0,ix-750):ix+1100] if ix>=0 else ''))
 else:out.append(t[pos:pos+5400])
Path('scripts/v424-inspect.txt').write_text('\n'.join(out)[:26000])
