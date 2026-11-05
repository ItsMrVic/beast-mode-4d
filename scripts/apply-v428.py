from pathlib import Path
p=Path('index.html');s=p.read_text()
assert 'v4.27' in s
assert '</head>' in s and '</body>' in s
assert 'cultural-theme.js' not in s
s=s.replace('v4.27','v4.28')
s=s.replace('</head>','<link rel="stylesheet" href="./cultural-theme.css?v=428"></head>',1)
s=s.replace('</body>','<script src="./cultural-theme.js?v=428" defer></script></body>',1)
p.write_text(s)
