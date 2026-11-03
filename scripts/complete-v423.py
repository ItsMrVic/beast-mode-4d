#!/usr/bin/env python3
from pathlib import Path
p=Path('index.html');s=p.read_text()
old="return {targetDay:targetDay||null,dayDrawsUsed:dayDraws.length,hasDayWindow,windows:windowAnalysis,consensusPerPos,predictions,sumZone,coldPerPos,dodgeVariants:[],modelVersion:'v4.19',scoreIsProbability:false};"
new="""// Dodge variants: one positional substitution using the least frequent recent digit.
  // This is an exploratory contrast, not a validated winning edge.
  const dodgeVariants=[];
  const seen=new Set(predictions.map(x=>x.num));
  for(const pick of predictions.slice(0,3)){
    for(let pos=0;pos<4;pos++){
      const cold=coldPerPos[pos].find(d=>d!==pick.num[pos]);
      if(cold===undefined)continue;
      const num=pick.num.slice(0,pos)+cold+pick.num.slice(pos+1);
      if(seen.has(num))continue;
      seen.add(num);
      dodgeVariants.push({num,baseNum:pick.num,swapPos:pos,hotDigit:pick.num[pos],coldDigit:cold,
        sumInZone:[...num].reduce((sum,d)=>sum+Number(d),0)>=sumZone[0]&&[...num].reduce((sum,d)=>sum+Number(d),0)<=sumZone[1]});
      break;
    }
  }
  return {targetDay:targetDay||null,dayDrawsUsed:dayDraws.length,hasDayWindow,windows:windowAnalysis,consensusPerPos,predictions,sumZone,coldPerPos,dodgeVariants,modelVersion:'v4.23',scoreIsProbability:false};"""
assert s.count(old)==1, 'Expected original Dodge placeholder'
s=s.replace(old,new,1)
p.write_text(s)
print('Added deterministic Dodge variants')

# Retry after serialized cross-operator correction.
