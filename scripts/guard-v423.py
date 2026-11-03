#!/usr/bin/env python3
from pathlib import Path
p=Path('index.html');s=p.read_text()
old="""        entry.checked=true;
        entry.hits=sniperHits;
        entry.permHits=sniperPermHits;
        entry.permWinDetails=sniperPermDetails;"""
new="""        // Cross-operator research observations are not verified ticket wins.
        // History's live result matcher highlights exact/permutation observations per operator.
        entry.checked=true;
        entry.crossOpMatches=sniperHits;
        entry.crossOpPermMatches=sniperPermDetails;
        entry.hits=[];
        entry.permHits=0;
        entry.permWinDetails=[];"""
assert s.count(old)==1,'Expected Sniper scoring block'
p.write_text(s.replace(old,new,1))
