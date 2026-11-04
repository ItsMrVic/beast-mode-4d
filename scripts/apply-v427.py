from pathlib import Path
p=Path('index.html');s=p.read_text()
assert 'v4.26' in s
s=s.replace('v4.26','v4.27')
p.write_text(s)
