// BEAST MODE AI Brain v4.41: no-network regression tests. Run with Node 22+: node scripts/check-ai-brain.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const workerSource=fs.readFileSync(new URL('../ai-backend/worker.js',import.meta.url),'utf8');
const worker=(await import('data:text/javascript;base64,'+Buffer.from(workerSource).toString('base64'))).default;
const page=fs.readFileSync(new URL('../ai-brain.html',import.meta.url),'utf8');
const scriptMatch=page.match(/<script>([\s\S]*?)<\/script>/);
assert(scriptMatch,'English AI Brain UI script missing');
new vm.Script(scriptMatch[1]);
assert(page.includes('lang="en"'),'AI UI should be English');
assert(!page.includes('sk-proj-'),'OpenAI API keys must not be in public UI');
assert(page.includes('contextPreview'),'Explicit local data preview should be visible');
assert(page.includes('accessToken'),'Separate Worker access token required');

const env={OPENAI_API_KEY:'sk-test-secret-should-never-leak',BEAST_AI_ACCESS_TOKEN:'random-unique-test-secret-1234567890',ALLOWED_ORIGIN:'https://itsmrvic.github.io',OPENAI_MODEL:'gpt-5.4-mini'};
const origin=env.ALLOWED_ORIGIN;
const initialRequest={
 message:'Explain how historical frequencies compare to a fair random draw.',
 context:{analyzedOperatorDraws:24,topHistoricalGroups:[{group:'1157',hitOperatorDraws:5}]},
 history:[{role:'assistant',content:'Welcome'}]
};
function request({allowed=true,token=env.BEAST_AI_ACCESS_TOKEN,body=JSON.stringify(initialRequest),method='POST',contentType='application/json'}={}){
 return new Request('https://beast-ai.example/chat',{
  method,
  headers:{Origin:allowed?origin:'https://attacker.example',Authorization:'Bearer '+token,'Content-Type':contentType},
  ...(method==='OPTIONS'?{}:{body})
 });
}
let callCount=0,lastPayload;
const originalFetch=globalThis.fetch;
globalThis.fetch=async (url,options)=>{
 callCount++;
 assert.equal(url,'https://api.openai.com/v1/responses');
 assert.equal(options.headers.Authorization,'Bearer '+env.OPENAI_API_KEY);
 lastPayload=JSON.parse(options.body);
 return new Response(JSON.stringify({model:'gpt-5.4-mini',output:[{type:'message',content:[{type:'output_text',text:'Historical hits do not establish future advantage.'}]}]}),{status:200,headers:{'Content-Type':'application/json'}});
};
try{
 const wrongOrigin=await worker.fetch(request({allowed:false}),env);
 assert.equal(wrongOrigin.status,403);
 assert.equal(wrongOrigin.headers.get('access-control-allow-origin'),null);
 assert.equal(callCount,0);
 const preflight=await worker.fetch(request({method:'OPTIONS'}),env);
 assert.equal(preflight.status,204);
 assert.equal(preflight.headers.get('access-control-allow-origin'),origin);
 const noToken=await worker.fetch(request({token:'wrong-token'}),env);
 assert.equal(noToken.status,401);
 assert.equal(callCount,0);
 const notReady=await worker.fetch(request(),{...env,OPENAI_API_KEY:''});
 assert.equal(notReady.status,503);
 const invalidBody=await worker.fetch(request({body:'not-json'}),env);
 assert.equal(invalidBody.status,400);
 const hugeBody=await worker.fetch(request({body:JSON.stringify({message:'x'.repeat(28001)})}),env);
 assert.equal(hugeBody.status,413);
 assert.equal(callCount,0);
 const ok=await worker.fetch(request(),env);
 assert.equal(ok.status,200);
 const text=JSON.stringify(await ok.json());
 assert(text.includes('Historical hits do not establish future advantage.'));
 assert(!text.includes(env.OPENAI_API_KEY));
 assert.equal(callCount,1);
 assert.equal(lastPayload.store,false);
 assert.equal(lastPayload.model,'gpt-5.4-mini');
 assert.equal(lastPayload.max_output_tokens,850);
 assert(lastPayload.instructions.includes('Historical hot/rare frequency'));
 assert.equal(lastPayload.input.at(-1).role,'user');
 assert(lastPayload.input.at(-1).content.includes('analyzedOperatorDraws'));
 console.log('PASS: AI Brain UI script, backend origin/token rejection, request bounds, secret isolation, and OpenAI store:false.');
}finally{globalThis.fetch=originalFetch}
