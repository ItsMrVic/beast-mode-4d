// Regression checks for the v4.39 715 iBOX Coverage Mode.
// Run: node scripts/check-ibox715.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../ibox-715.html',import.meta.url),'utf8');
const resultArchive=JSON.parse(fs.readFileSync(new URL('../data/verified-results.json',import.meta.url),'utf8'));
const begin=html.indexOf('function makeGroups(){');
const end=html.indexOf('const GROUPS=makeGroups();');
assert(begin>=0&&end>begin,'Live iBOX group generation function must exist');
const functionSource=html.slice(begin,end);
const groups=vm.runInNewContext('const fact=[1,1,2,6,24];\n'+functionSource+'\nmakeGroups();');
const groupMap=new Map(groups.map(g=>[g.key,g.perms]));
assert.equal(groups.length,715);
assert.equal(groupMap.size,715);
assert.equal(groups.reduce((sum,g)=>sum+g.perms,0),10000);
assert.equal(groups.filter(g=>g.perms===24).length,210);
assert.equal(groups.filter(g=>g.perms===12).length,360);
assert.equal(groups.filter(g=>g.perms===6).length,45);
assert.equal(groups.filter(g=>g.perms===4).length,90);
assert.equal(groups.filter(g=>g.perms===1).length,10);
for(let n=0;n<10000;n++){
 const key=String(n).padStart(4,'0').split('').sort().join('');
 assert(groupMap.has(key),'Uncovered number '+n);
}
assert(groupMap.get('1157')===12,'5117 should be a 12-way family');
const rates=[3800,1250,750,210,70];
function payout(board){
 const entries=[...board.top3.map((n,i)=>[n,rates[i]]),...board.special.map(n=>[n,rates[3]]),...board.consolation.map(n=>[n,rates[4]])];
 assert.equal(entries.length,23,'Complete prize board required');
 return entries.reduce((sum,[n,rate])=>sum+rate/groupMap.get(n.split('').sort().join('')),0);
}
const expectTotal={'2026-11-18':1515.4166666666667,'2026-11-21':1708.75};
for(const [date,expected] of Object.entries(expectTotal)){
 const draws=resultArchive.draws.filter(d=>d.date===date);
 assert.equal(draws.length,3,'All 3 operators for '+date);
 const total=draws.reduce((sum,d)=>sum+payout(d),0);
 assert(Math.abs(total-expected)<.01,'iBOX prize total mismatch for '+date+': '+total);
 const withRebate=total+3*715*.05-3*715;
 assert(Number.isFinite(withRebate));
}
console.log('PASS: 715 unique groups, 10,000 covered numbers, repeated-digit permutations, and historical prize totals.');


// v4.40: verify the separate per-operator/date archive and historical cutoff.
const plugin=fs.readFileSync(new URL('../ibox-hot-archive-v440.js',import.meta.url),'utf8');
new vm.Script(plugin);
const elements={},defaults={hotThrough:'2026-11-21',hotWindow:'all',hotThreshold:'20',hotSearch:''};
function ui(id){return elements[id]||(elements[id]={value:defaults[id]||'',textContent:'',innerHTML:'',disabled:false,addEventListener(){},onclick:null});}
const buttons=['top20','hot','rare','hit','all'].map(hotFilter=>({dataset:{hotFilter},addEventListener(){},setAttribute(){}}));
const memory=new Map(),storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
const windowStub={B4D_IBOX715_BRIDGE:{
 getGroups:()=>groups,
 getBoards:()=>resultArchive.draws.map(d=>({...d,op:d.operator})),
 getDate:()=>ui('hotThrough').value,
 getSelectedOps:()=>['MAGNUM','TOTO','DAMACAI']
}};
vm.runInNewContext(plugin,{window:windowStub,document:{getElementById:ui,querySelectorAll:()=>buttons},localStorage:storage,console});
const hot=windowStub.B4D_IBOX_HOT;
assert(hot,'Hot frequency archive did not initialize');
assert.equal(hot.archiveCount(),resultArchive.draws.length,'Incomplete/duplicate saved archive');
assert.equal(hot.study().n,resultArchive.draws.length);
assert.equal(hot.study().rows.length,715);
assert.equal(hot.study().hot.length,0,'Must not shortlist before 30 operator-draws');
assert(memory.has('b4d-ibox715-hit-history-v1'),'Archive was not persisted');
const sampleBoard=resultArchive.draws.find(d=>d.operator==='TOTO');
const historical=Array.from({length:31},(_,i)=>({
 op:'TOTO',date:'2026-10-'+String(i+1).padStart(2,'0'),
 top3:i<9?['1234',sampleBoard.top3[1],sampleBoard.top3[2]]:sampleBoard.top3,
 special:sampleBoard.special,consolation:sampleBoard.consolation,
 source:'Regression test'
}));
hot.ingest(historical);
assert.equal(hot.archiveCount(),resultArchive.draws.length+31);
hot.ingest(historical);
assert.equal(hot.archiveCount(),resultArchive.draws.length+31,'Repeated draw ingestion double-counted records');
ui('hotThrough').value='2026-10-31';
assert.equal(hot.study().n,31,'Analysis included future results beyond selected end date');
assert.equal(hot.study().rows.length,715);
const saved=JSON.parse(memory.get('b4d-ibox715-hit-history-v1'));
assert.equal(saved.length,resultArchive.draws.length+31,'Persisted archive did not capture new draws');
console.log('PASS: persistent deduplicated hot-set archive, 30-draw minimum, and historical date cutoff.');
