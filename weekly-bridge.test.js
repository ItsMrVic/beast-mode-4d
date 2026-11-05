/* Run: node weekly-bridge.test.js */
const assert=require('node:assert/strict');
const {convert,inspect}=require('./weekly-bridge.js');
const engine=require('./weekly-intelligence.js');
const ops=[{name:'MAGNUM',draws:[
 {date:'2026-10-28',day:'Wed',top3:['0001','2345','1234'],special:['9999'],consolation:['1230']},
 {date:'2026-10-27',day:'Tue',top3:['8888','2222','7654'],special:[],consolation:[]},
 {date:'2026-10-31',day:'Sat',top3:['2222','0000','0012'],special:['1111'],consolation:[]}
]}, {name:'TOTO',draws:[{date:'2026-10-28',day:'Wed',top3:['3131','4444','5555'],special:[],consolation:[]}]}];
const original=JSON.stringify(ops);
const converted=convert(ops);
assert.equal(converted.rows.length,4);
assert.equal(converted.issues.length,0);
const regular=converted.rows.find(d=>d.date==='2026-10-28'&&d.operator==='Magnum');
assert.equal(regular.type,'regular','regular draw Special prize tier is not a separate Special Draw');
assert.equal(regular.numbers[0],'0001');
assert.equal(regular.numbers.length,5);
const tentative=converted.rows.find(d=>d.date==='2026-10-27');
assert.equal(tentative.type,'special');
assert.match(tentative.source,/Tuesday inferred/);
const early=inspect(ops,engine,'Magnum','2026-10-27');
assert.equal(early.snapshot.profile.drawCount,1);
const later=inspect(ops,engine,'Magnum','2026-10-31');
assert.equal(later.snapshot.profile.drawCount,3);
assert.equal(later.snapshot.profile.numberCount,12);
assert.equal(JSON.stringify(ops),original,'Read-only bridge must not mutate operator records');
assert.throws(()=>inspect(ops,engine,'Magnum','2026-02-31'),/Invalid date/);
console.log('Weekly bridge tests passed');
