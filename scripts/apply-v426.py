from pathlib import Path
p=Path('index.html')
s=p.read_text()
assert 'v4.25' in s, 'Expected v4.25 main app label missing'
s=s.replace('v4.25','v4.26')
p.write_text(s)
print('Updated main app version label to v4.26')
