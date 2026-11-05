/* BEAST MODE 4D v4.28 — appearance only. No prediction or draw data access. */
(()=>{'use strict';
const KEY='beast-cultural-theme-v428';
const themes={
 imperial:{name:'Imperial Dragon · Everyday',bg:'#120e0d',panel:'#241916',accent:'#e8b95f',accent2:'#b83b30',pattern:'rgba(232,185,95,.07)',symbol:'🐉'},
 cny:{name:'Chinese New Year',bg:'#290b12',panel:'#49151d',accent:'#ffd16d',accent2:'#e34843',pattern:'rgba(255,209,109,.09)',symbol:'🧧'},
 raya:{name:'Hari Raya Aidilfitri',bg:'#09251d',panel:'#164333',accent:'#eed48b',accent2:'#1b9b70',pattern:'rgba(238,212,139,.08)',symbol:'🌙'},
 deepavali:{name:'Deepavali',bg:'#21102e',panel:'#412158',accent:'#ffcf74',accent2:'#a34bbb',pattern:'rgba(255,207,116,.08)',symbol:'🪔'},
 merdeka:{name:'Merdeka Day',bg:'#101d39',panel:'#20355e',accent:'#ffd85e',accent2:'#d74350',pattern:'rgba(255,216,94,.07)',symbol:'🇲🇾'},
 malaysia:{name:'Malaysia Day',bg:'#111e38',panel:'#22395f',accent:'#f7d364',accent2:'#e1464d',pattern:'rgba(247,211,100,.07)',symbol:'🇲🇾'},
 christmas:{name:'Christmas',bg:'#10251e',panel:'#244335',accent:'#f3d6a1',accent2:'#bd3b4d',pattern:'rgba(243,214,161,.08)',symbol:'🎄'},
 midautumn:{name:'Mid-Autumn Festival',bg:'#171c35',panel:'#283453',accent:'#f2ca79',accent2:'#8b6ec2',pattern:'rgba(242,202,121,.08)',symbol:'🏮'},
 wesak:{name:'Wesak Day',bg:'#192039',panel:'#2b3753',accent:'#eacb91',accent2:'#647fb6',pattern:'rgba(234,203,145,.08)',symbol:'🪷'},
 gawai:{name:'Gawai Dayak',bg:'#1e2214',panel:'#35412a',accent:'#f0ce7a',accent2:'#7d9a4b',pattern:'rgba(240,206,122,.08)',symbol:'🌾'},
 kaamatan:{name:'Kaamatan',bg:'#23200e',panel:'#453c1d',accent:'#f1d080',accent2:'#a68132',pattern:'rgba(241,208,128,.08)',symbol:'🌾'}
};
const movable={
 2026:{cny:'02-17',raya:'03-21',deepavali:'11-08',midautumn:'09-25',wesak:'05-31'},
 2027:{cny:'02-06',raya:'03-10',deepavali:'10-29',midautumn:'09-15',wesak:'05-20'}
};
// Movable dates are reference estimates and may differ from official Malaysian announcements.
const fixed=[{id:'merdeka',start:'08-25',end:'08-31'},{id:'malaysia',start:'09-10',end:'09-16'},{id:'christmas',start:'12-20',end:'12-26'},{id:'gawai',start:'06-01',end:'06-02'},{id:'kaamatan',start:'05-30',end:'05-31'}];
const tzDate=()=>{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const o=Object.fromEntries(parts.map(p=>[p.type,p.value]));return o.year+'-'+o.month+'-'+o.day;};
const day=(y,md)=>Date.parse(y+'-'+md+'T00:00:00Z')/86400000;
function autoTheme(today){
 const y=Number(today.slice(0,4)),now=Date.parse(today+'T00:00:00Z')/86400000;
 const events=[];
 for(const e of fixed){const a=day(y,e.start),b=day(y,e.end);if(now>=a&&now<=b)events.push({id:e.id,priority:2,dist:Math.abs(now-a)});}
 for(const yy of [y-1,y,y+1]){for(const [id,md] of Object.entries(movable[yy]||{})){
 const start=day(yy,md);const before=id==='cny'?5:id==='raya'?3:2;const after=id==='cny'?14:id==='raya'?6:2;
 if(now>=start-before&&now<=start+after)events.push({id,priority:3,dist:Math.abs(now-start)});
 }}
 events.sort((a,b)=>b.priority-a.priority||a.dist-b.dist||a.id.localeCompare(b.id));
 return events[0]?.id||'imperial';
}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {mode:x.mode==='manual'?'manual':'auto',theme:themes[x.theme]?x.theme:'imperial'};}catch{return {mode:'auto',theme:'imperial'};}}
let settings=read(),lastFocus=null;
function apply(){
 const id=settings.mode==='auto'?autoTheme(tzDate()):settings.theme,t=themes[id];
 const root=document.documentElement;root.dataset.culture=id;
 root.style.setProperty('--culture-bg',t.bg);root.style.setProperty('--culture-panel',t.panel);root.style.setProperty('--culture-accent',t.accent);root.style.setProperty('--culture-accent2',t.accent2);root.style.setProperty('--culture-pattern',t.pattern);
 const launch=document.getElementById('culture-launch');if(launch){launch.textContent=t.symbol+' Theme';launch.setAttribute('aria-label','Cultural theme settings: '+t.name);}
 const active=document.getElementById('culture-active');if(active)active.textContent=t.symbol+' '+t.name+' ('+(settings.mode==='auto'?'automatic':'manual')+')';
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(settings));}catch(e){const msg=document.getElementById('culture-storage');if(msg)msg.textContent='Theme preference could not be saved on this device.';}apply();}
function init(){
 if(document.getElementById('culture-launch'))return;
 const btn=document.createElement('button');btn.id='culture-launch';btn.type='button';btn.setAttribute('aria-haspopup','dialog');document.body.appendChild(btn);
 const modal=document.createElement('div');modal.id='culture-dialog';modal.setAttribute('aria-hidden','true');
 modal.innerHTML='<div class="culture-panel" role="dialog" aria-modal="true" aria-labelledby="culture-title"><h2 id="culture-title">🐉 Cultural Theme Engine</h2><p id="culture-active"></p><label for="culture-mode">Theme switching</label><select id="culture-mode"><option value="auto">Automatic · Malaysia calendar</option><option value="manual">Manual · choose a theme</option></select><label for="culture-choice">Theme preview / manual choice</label><select id="culture-choice"></select><p class="culture-note">Uses Malaysia time. Movable festival dates for 2026–2027 are provisional and should be checked against official Malaysian announcements. Outside the known calendar years, the Imperial Dragon theme is used except on fixed-date celebrations. This changes appearance only; predictions and saved data are untouched.</p><p id="culture-storage" role="status"></p><button class="culture-btn" id="culture-save" type="button">Save theme settings</button><button class="culture-btn" id="culture-close" type="button">Close</button></div>';
 document.body.appendChild(modal);
 const mode=document.getElementById('culture-mode'),choice=document.getElementById('culture-choice');
 for(const [id,t] of Object.entries(themes)){const opt=document.createElement('option');opt.value=id;opt.textContent=t.symbol+' '+t.name;choice.appendChild(opt);}
 function close(){modal.dataset.open='false';modal.setAttribute('aria-hidden','true');lastFocus?.focus();}
 btn.addEventListener('click',()=>{lastFocus=document.activeElement;mode.value=settings.mode;choice.value=settings.mode==='auto'?autoTheme(tzDate()):settings.theme;modal.dataset.open='true';modal.setAttribute('aria-hidden','false');mode.focus();});
 document.getElementById('culture-close').addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 modal.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const els=[mode,choice,document.getElementById('culture-save'),document.getElementById('culture-close')];const i=els.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();els.at(-1).focus();}else if(!e.shiftKey&&i===els.length-1){e.preventDefault();els[0].focus();}}});
 document.getElementById('culture-save').addEventListener('click',()=>{settings={mode:mode.value,theme:choice.value};save();close();});
 apply();
 // Refresh on return to foreground; no background polling.
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&settings.mode==='auto')apply();});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
