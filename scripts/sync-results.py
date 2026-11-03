#!/usr/bin/env python3
"""Fetch independently checked Malaysian 4D draws. Standard library only."""
import json, pathlib, urllib.request, datetime, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
DEST=ROOT/'data'/'verified-results.json'
API='https://4dlivetoday.com/api/v1/latest'
MAPPING={'magnum':'MAGNUM','toto':'TOTO','damacai':'DAMACAI'}
def valid_number(x): return isinstance(x,str) and len(x)==4 and x.isdigit()
def normalize(raw):
    op=MAPPING.get(raw.get('operator'))
    date=raw.get('date','')
    try: datetime.date.fromisoformat(date)
    except (ValueError,TypeError): return None
    top=[raw.get(k) for k in ('first','second','third')]
    special=raw.get('special')
    consolation=raw.get('consolation')
    if not op or raw.get('status')!='checked' or not all(map(valid_number,top)):return None
    if not isinstance(special,list) or len(special)!=10 or not all(map(valid_number,special)):return None
    if not isinstance(consolation,list) or len(consolation)!=10 or not all(map(valid_number,consolation)):return None
    if date>datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).date().isoformat():return None
    return {'operator':op,'date':date,'top3':top,'special':special,'consolation':consolation,'source':'4dlivetoday.com','status':'checked'}
def merge(previous,incoming):
    by_key={(r['operator'],r['date']):r for r in previous if isinstance(r,dict) and r.get('operator') in MAPPING.values() and isinstance(r.get('date'),str)}
    conflicts=[]
    for r in incoming:
        key=(r['operator'],r['date'])
        if key in by_key and any(by_key[key].get(k)!=r[k] for k in ('top3','special','consolation')):
            conflicts.append(key)
            continue
        by_key[key]=r
    return sorted(by_key.values(),key=lambda r:(r['date'],r['operator']),reverse=True)[:120],conflicts
def main():
    req=urllib.request.Request(API,headers={'User-Agent':'BEAST-MODE-4D/4.22 (+GitHub Actions)','Accept':'application/json'})
    with urllib.request.urlopen(req,timeout=25) as response:
        payload=json.load(response)
    raw=payload.get('data',{}).get('results',[])
    if not isinstance(raw,list):raise ValueError('Unexpected API response')
    incoming=[r for item in raw if isinstance(item,dict) if (r:=normalize(item))]
    if not incoming:
        print('No newly checked, complete draws. Leaving existing database unchanged.')
        return
    old=json.loads(DEST.read_text())['draws'] if DEST.exists() else []
    merged,conflicts=merge(old,incoming)
    if conflicts:print('Conflicts preserved for manual review:',conflicts,file=sys.stderr)
    DEST.parent.mkdir(parents=True,exist_ok=True)
    DEST.write_text(json.dumps({'schema':1,'source':'https://4dlivetoday.com','attribution':'Results from 4dlivetoday.com, compiled from official operator sites.','draws':merged},indent=2,ensure_ascii=False)+'\n')
    print(f'Validated {len(incoming)}; stored {len(merged)}; conflicts {len(conflicts)}')
if __name__=='__main__':main()
