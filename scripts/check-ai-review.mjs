// BEAST MODE v4.42 AI Review: static integrations and no-network behavior checks.
// Run: node scripts/check-ai-review.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const moduleCode=fs.readFileSync(new URL('../ai-prediction-review-v442.js',import.meta.url),'utf8');
new vm.Script(moduleCode);
const main=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
for(const anchor of [
  'src="./ai-prediction-review-v442.js?v=442"',
  "window.B4D_REVIEW.filter('PREDICT'",
  "window.B4D_REVIEW.filter('ORACLE'",
  "window.B4D_REVIEW.filter('HOTHAND'",
  "window.B4D_REVIEW.filter('DEEPLEARN'",
  'window.B4D_REVIEW.controls()'
 ])assert(main.includes(anchor),'Missing integrated review hook: '+anchor);
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
assert(sw.includes("'./ai-prediction-review-v442.js?v=442'"),'Offline shell lacks reviewer');
const storage=new Map();
const fakeStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
const endpoint={value:'https://secure-ai.example'};
const secret='separate-access-token-longer-than-24';
const password={value:secret};
const document={getElementById:id=>({
  reviewEndpoint:endpoint,reviewToken:password,reviewSettingsStatus:{textContent:''}
 }[id]||null)};
let requests=0,updates=0;
const testFetch=async (_url,_opts)=>{
  requests++;
  return {ok:true,json:async()=>({
    keep:['1234','9999'],notes:[{num:'1234',reason:'Example fit comparison'}],disclaimer:'Not a probability'
  })};
};
const fakeURL=class{
 constructor(){this.origin='https://secure-ai.example';this.hostname='secure-ai.example';this.protocol='https:';this.username='';this.password='';this.hash='';this.search=''}
};
const context={
 window:{},document,localStorage:fakeStorage,fetch:testFetch,URL:fakeURL,
 AbortController:class{constructor(){this.signal={}}abort(){}},
 setTimeout:()=>1,clearTimeout:()=>{},render:()=>{updates++},
 console
};
vm.runInNewContext(moduleCode,context);
const gate=context.window.B4D_REVIEW;
const choices=[{num:'1234',score:81},{num:'5678',score:64}];
assert.deepEqual(JSON.parse(JSON.stringify(gate.filter('PREDICT','MAGNUM','2026-11-25',choices))),choices,'Disabled review must not alter original list');
gate.toggle();
assert.equal(gate.filter('PREDICT','MAGNUM','2026-11-25',choices).length,0,'Review must block unreviewed picks');
gate.connect();
assert.equal(gate.filter('PREDICT','MAGNUM','2026-11-25',choices).length,0,'Review must block while awaiting AI');
await new Promise(resolve=>setTimeout(resolve,10));
const reviewed=gate.filter('PREDICT','MAGNUM','2026-11-25',choices);
assert.deepEqual(reviewed.map(x=>x.num),['1234'],'Only an original approved candidate may appear');
assert(gate.banner('PREDICT','MAGNUM','2026-11-25',choices).includes('5678'),'Excluded candidate should be auditable');
assert.equal(requests,1,'Cached review must not trigger new API requests');
assert(storage.has('b4d-ai-review-history-v1'),'Review decision not saved');
assert(![...storage.values()].some(x=>String(x).includes(secret)),'Backend token must not be stored');
console.log('PASS: AI review gate, main screen hooks, cache, rejected archive, and secret isolation.');
