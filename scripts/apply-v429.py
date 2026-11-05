from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
assert s.count('v4.28')>=1, 'Expected v4.28 index'
assert 'cultural-art.js?v=429' not in s
assert s.count('</head>')==1 and s.count('</body>')==1
assert s.count("btn.disabled=true;btn.textContent='⏳ ANALYZING...';")==1
s=s.replace('v4.28','v4.29')
s=s.replace('</head>','<link rel="stylesheet" href="./cultural-art.css?v=429"></head>',1)
s=s.replace('</body>','<script src="./cultural-art.js?v=429" defer></script></body>',1)
s=s.replace("btn.disabled=true;btn.textContent='⏳ ANALYZING...';",
"""btn.disabled=true;btn.textContent='⏳ ANALYZING...';
  // Decorative-only event; fired after existing input and data validations.
  document.dispatchEvent(new CustomEvent('beast:prediction-start'));""",1)
p.write_text(s,encoding='utf-8')
print('v4.29 artwork linked and RUN visual event attached')
