/* BEAST MODE 4D v4.30: standalone, non-mutating weekly research engine.
 * Integration intentionally opt-in. No claim of predictive advantage.
 */
(function(root){
"use strict";
const VERSION="4.30.0";
function number4(value){const s=String(value);if(!/^\d{1,4}$/.test(s))throw Error("Invalid four-digit number");return s.padStart(4,"0");}
function dateKey(value){if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value+"T00:00:00Z")))throw Error("Invalid date");return value;}
function normalizeDraw(raw){
 if(!raw||!["Magnum","Toto","Da Ma Cai"].includes(raw.operator))throw Error("Invalid operator");
 const date=dateKey(raw.date),type=raw.type==="special"?"special":raw.type==="regular"?"regular":null;
 if(!type||!Array.isArray(raw.numbers)||!raw.numbers.length)throw Error("Draw requires type and numbers");
 return Object.freeze({id:raw.operator+"|"+date+"|"+type,operator:raw.operator,date,type,
  numbers:Object.freeze(raw.numbers.map(number4)),source:String(raw.source||"unverified")});
}
function features(draws,operator,cutoff){
 const rows=draws.filter(d=>d.operator===operator&&d.date<=cutoff),digits=Array(10).fill(0),
 positions=Array.from({length:4},()=>Array(10).fill(0)),sums=[],repeats={};
 let count=0;
 for(const d of rows)for(const n of d.numbers){count++;let sum=0;for(let i=0;i<4;i++){const k=Number(n[i]);digits[k]++;positions[i][k]++;sum+=k;}sums.push(sum);
 const unique=new Set(n).size;repeats[unique]=(repeats[unique]||0)+1;}
 return {operator,cutoff,drawCount:rows.length,numberCount:count,digits,positions,
  meanDigitSum:count?sums.reduce((a,b)=>a+b,0)/count:null,repeatedDigitGroups:repeats,
  status:rows.length<20?"insufficient-data":"descriptive-only"};
}
function createMonitor(initial=[]){
 const events=new Map(),snapshots=[];
 for(const raw of initial)ingest(raw);
 function ingest(raw){const d=normalizeDraw(raw),prior=events.get(d.id);
  if(prior&&JSON.stringify(prior)!==JSON.stringify(d))throw Error("Conflicting draw "+d.id);
  events.set(d.id,d);return {added:!prior,id:d.id};}
 function snapshot(operator,cutoff,createdAt){
  dateKey(cutoff);if(!["Magnum","Toto","Da Ma Cai"].includes(operator))throw Error("Invalid operator");
  if(typeof createdAt!=="string"||Number.isNaN(Date.parse(createdAt)))throw Error("Invalid timestamp");
  const rows=Array.from(events.values()).filter(d=>d.date<=cutoff).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
  const profile=features(rows,operator,cutoff);
  const result=Object.freeze({id:"weekly-"+(snapshots.length+1),version:VERSION,operator,cutoff,createdAt,
   includedDrawIds:Object.freeze(rows.filter(d=>d.operator===operator).map(d=>d.id)),profile});
  snapshots.push(result);return result;
 }
 function lockPrediction({snapshotId,targetDate,createdAt,candidates,strategy}){
  const snap=snapshots.find(s=>s.id===snapshotId);if(!snap)throw Error("Unknown snapshot");
  dateKey(targetDate);if(targetDate<=snap.cutoff)throw Error("Target must follow data cutoff");
  if(!createdAt||Number.isNaN(Date.parse(createdAt))||Date.parse(createdAt)<Date.parse(snap.createdAt))throw Error("Invalid creation time");
  if(createdAt.slice(0,10)>=targetDate)throw Error("Prediction must be locked before target date");
  if(!Array.isArray(candidates)||!candidates.length)throw Error("Missing candidates");
  const numbers=candidates.map(number4);if(new Set(numbers).size!==numbers.length)throw Error("Duplicate candidates");
  return Object.freeze({snapshotId,operator:snap.operator,targetDate,createdAt,strategy:String(strategy||"adaptive"),
   candidates:Object.freeze(numbers)});
 }
 return Object.freeze({ingest,snapshot,lockPrediction,draws:()=>Array.from(events.values()),
  snapshots:()=>snapshots.slice()});
}
const api=Object.freeze({VERSION,number4,normalizeDraw,features,createMonitor});
if(typeof module!=="undefined"&&module.exports)module.exports=api;
else root.BeastWeeklyIntelligence=api;
})(typeof globalThis!=="undefined"?globalThis:this);
