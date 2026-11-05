/* BEAST MODE 4D v4.29 Illustrated Prosperity Edition
 * Decorative artwork only. Never reads/writes prediction, betting or history data.
 */
(()=>{'use strict';
const MOTION_KEY='beast-culture-motion-v429';
const THEMES={
 imperial:['IMPERIAL DRAGON','Fortune & Tradition','Golden clouds • a timeless Chinese-inspired world'],
 cny:['LUNAR NEW YEAR','新年快乐 · Xin Nian Kuai Le','Lanterns, blossoming branches and festive joy'],
 raya:['SALAM AIDILFITRI','Selamat Hari Raya','Ketupat, pelita and the glow of celebration'],
 deepavali:['FESTIVAL OF LIGHTS','Happy Deepavali','Diya lamps and radiant rangoli'],
 merdeka:['HARI MERDEKA','Malaysia Merdeka','Jalur Gemilang • a celebration of freedom'],
 malaysia:['HARI MALAYSIA','Malaysia Day','Together in the spirit of Malaysia'],
 christmas:['CHRISTMAS','Season of Warmth','Evergreen branches and shimmering lights'],
 midautumn:['MID-AUTUMN','中秋快乐 · Moon Festival','Golden moonlight and lanterns'],
 wesak:['WESAK DAY','Peace & Reflection','Lotus blossoms and calm illumination'],
 gawai:['HARI GAWAI','Gayu Guru Gerai Nyamai','Harvest tradition and woven artistry'],
 kaamatan:['PESTA KAAMATAN','Kotobian Tadau Tagazo Do Kaamatan','Harvest motifs and golden paddy']
};
const svg=(view,inner)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" aria-hidden="true" focusable="false">'+inner+'</svg>';
const goldDefs='<defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff2b6"/><stop offset=".48" stop-color="#edb953"/><stop offset="1" stop-color="#a76c26"/></linearGradient><linearGradient id="ar" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fc6052"/><stop offset="1" stop-color="#811f29"/></linearGradient></defs>';
function dragon(){
 return svg('0 0 540 235',goldDefs+
 '<path d="M27 147 C75 48 148 205 219 128 S350 70 418 137" fill="none" stroke="#71312d" stroke-width="44" stroke-linecap="round"/>'+
 '<path d="M27 147 C75 48 148 205 219 128 S350 70 418 137" fill="none" stroke="url(#ag)" stroke-width="33" stroke-linecap="round"/>'+
 '<path d="M29 147 C80 48 148 205 219 128 S350 70 418 137" fill="none" stroke="#ffe4a0" stroke-opacity=".55" stroke-width="4" stroke-dasharray="5 14" stroke-linecap="round"/>'+
 '<g fill="#dca54e" stroke="#80412b" stroke-width="2"><path d="M65 100 46 59 91 83Z"/><path d="M136 160 132 121 163 137Z"/><path d="M227 110 214 65 251 94Z"/><path d="M316 79 329 38 344 81Z"/><path d="M391 122 422 90 417 143Z"/></g>'+
 '<path d="M29 147 Q-8 171 12 210 Q30 191 44 182 L38 152Z" fill="#be622b" stroke="#f6ce73" stroke-width="3"/>'+
 '<g stroke="#d7a75d" stroke-width="6" stroke-linecap="round"><path d="M168 151l-11 28-17 4m19-6 13 11"/><path d="M338 95l-5 29-19 8m19-8 15 6"/></g>'+
 '<g transform="translate(412 100)"><path d="M1 18 Q24 -18 64 -9 Q102 -6 98 28 Q87 51 49 48 L11 48Z" fill="url(#ag)" stroke="#663520" stroke-width="4"/>'+
 '<path d="M19 -7 7 -40 29 -32 34 -13M56 -16 64 -51 80 -48 79 -9" fill="url(#ag)" stroke="#b7762f" stroke-width="4"/>'+
 '<path d="M65 9 Q88 3 111 25 L92 45 67 38Z" fill="#edbf73" stroke="#8b482c" stroke-width="3"/>'+
 '<path d="M64 37 Q79 65 108 60 M60 31 Q90 62 116 39" fill="none" stroke="#f7deae" stroke-width="3" stroke-linecap="round"/>'+
 '<ellipse cx="63" cy="4" rx="8" ry="7" fill="#622326"/><circle cx="65" cy="2" r="2.4" fill="#f5edcc"/>'+
 '<path d="M4 36 Q-16 53 -14 75M21 47 Q17 66 31 83" fill="none" stroke="#f7dc9a" stroke-width="5" stroke-linecap="round"/>'+
 '<path d="M34 42 Q22 59 -5 65" fill="none" stroke="#b65735" stroke-width="4"/></g>'+
 '<path d="M68 203q26-7 42-29M99 214q25-8 40-22" fill="none" stroke="#e9bb66" stroke-width="3" opacity=".8"/>');
}
function caishen(){
 return svg('0 0 176 225',goldDefs+
 '<ellipse cx="88" cy="211" rx="58" ry="11" fill="#160f16" opacity=".25"/>'+
 '<path d="M46 120 Q20 142 24 195 Q88 217 151 195 Q158 140 127 119Z" fill="url(#ar)" stroke="#f3ca67" stroke-width="5"/>'+
 '<path d="M47 135 Q84 143 128 130 L139 189 Q85 212 37 187Z" fill="#d03834" stroke="#f6ce74" stroke-width="3"/>'+
 '<path d="M60 130 Q90 166 116 130M57 156 Q86 181 121 156" fill="none" stroke="#f8d17c" stroke-width="5" opacity=".78"/>'+
 '<path d="M36 151 Q8 154 15 179L42 175M137 151Q165 156 165 177L138 177" fill="#c83236" stroke="#f3bf6e" stroke-width="4"/>'+
 '<ellipse cx="36" cy="178" rx="16" ry="11" fill="#ffce9d"/><ellipse cx="143" cy="178" rx="16" ry="11" fill="#ffce9d"/>'+
 '<ellipse cx="89" cy="100" rx="48" ry="49" fill="#ffd6a7" stroke="#dca16d" stroke-width="3"/>'+
 '<ellipse cx="41" cy="104" rx="8" ry="13" fill="#f6c89a"/><ellipse cx="137" cy="104" rx="8" ry="13" fill="#f6c89a"/>'+
 '<path d="M59 99q9-9 18 0M101 99q9-9 18 0" fill="none" stroke="#502a27" stroke-width="5" stroke-linecap="round"/>'+
 '<path d="M80 121 Q90 133 103 121" fill="none" stroke="#a94a46" stroke-width="3" stroke-linecap="round"/>'+
 '<circle cx="53" cy="113" r="8" fill="#f19c8f" opacity=".6"/><circle cx="125" cy="113" r="8" fill="#f19c8f" opacity=".6"/>'+
 '<path d="M50 65 Q90 50 128 65 L135 53 43 53Z" fill="#1d222d" stroke="#f0bf60" stroke-width="4"/>'+
 '<path d="M40 60 Q36 32 61 24 L116 24 Q145 35 136 60Z" fill="url(#ar)" stroke="#f2c666" stroke-width="5"/>'+
 '<path d="M65 22V12H113V22" fill="#d8a348" stroke="#f4d37e" stroke-width="3"/>'+
 '<circle cx="88" cy="44" r="18" fill="url(#ag)" stroke="#d09a3b" stroke-width="2"/><path d="M79 44H97M88 34V54" stroke="#9b592d" stroke-width="3"/>'+
 '<g class="cult-gold-ingot"><path d="M45 166q43 8 86-1l-11 27q-34 14-65 0Z" fill="url(#ag)" stroke="#8c522c" stroke-width="3"/><path d="M53 162 Q87 126 122 162L128 170Q88 182 47 170Z" fill="#ffda79" stroke="#97542c" stroke-width="3"/><ellipse cx="88" cy="163" rx="21" ry="11" fill="#ffe9a4" stroke="#ce9134" stroke-width="3"/></g>'+
 '<circle cx="88" cy="191" r="6" fill="#fbe29c"/>');
}
function lantern(){return svg('0 0 80 128',goldDefs+'<path d="M40 0v14M22 15h36" stroke="#f6cd76" stroke-width="5" stroke-linecap="round"/><ellipse cx="40" cy="59" rx="29" ry="42" fill="url(#ar)" stroke="#e4b154" stroke-width="4"/><path d="M25 24Q9 56 25 92M55 24Q71 56 55 92M40 18v82" stroke="#ffc76c" stroke-opacity=".65" fill="none" stroke-width="3"/><path d="M19 95h42M40 96v17M33 112v12M47 112v12" stroke="#ffd477" stroke-width="4" stroke-linecap="round"/><ellipse cx="40" cy="58" rx="8" ry="15" fill="#ffce7b" opacity=".45"/>');}
function clouds(){
 return svg('0 0 620 210','<g fill="none" stroke="#e9c276" stroke-opacity=".31" stroke-width="2.5"><path d="M-10 86q32-23 58 0 19 12 43-7t50 9q31 17 55-5M235 156q39-37 74-2 23 11 47-5 35-23 60 8 22 16 52-7M439 58q27-24 57-3 25 18 55 0 20-13 61 8"/><path d="M10 163q29-15 48 6 22 20 54-9M490 167q19-25 41-9 18 13 43-4"/></g><g fill="#f1c66b" opacity=".16"><circle cx="150" cy="23" r="2"/><circle cx="310" cy="38" r="3"/><circle cx="554" cy="110" r="2"/></g>');
}
function motif(id){
 const d='<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1aa"/><stop offset="1" stop-color="#cc8d36"/></linearGradient></defs>';
 const ring='<circle cx="115" cy="95" r="68" stroke="#f4ce7e" stroke-opacity=".38" stroke-width="2" fill="none"/><circle cx="115" cy="95" r="53" stroke="#f4ce7e" stroke-opacity=".22" stroke-width="2" fill="none"/>';
 let art='';
 if(id==='raya'){
 art='<path d="M139 25a57 57 0 1 0 44 92 49 49 0 0 1-44-92" fill="#f6d890" stroke="#fff3bc" stroke-width="2"/><path d="M191 30l7 15 16 2-12 11 3 17-14-8-14 8 3-17-13-11 17-2Z" fill="#ffeeb3"/><g transform="translate(55 96) rotate(-7)"><path d="M0 40 48 0 96 40 48 81Z" fill="#5ab988" stroke="#f8dc8f" stroke-width="4"/><path d="M24 22 71 62M48 0l48 40M0 40l48 41M72 20 24 61" stroke="#e9f2b7" stroke-width="8" opacity=".8"/><path d="M48 81v38M96 40l24 23" stroke="#f7d889" stroke-width="4"/></g>';
 }else if(id==='deepavali'){
 art=ring+'<g fill="none" stroke="#fbd288" stroke-width="4"><circle cx="115" cy="103" r="32"/><path d="M115 18v27M115 161v27M30 102h30M171 102h30M52 39l20 21M159 148l20 20M178 39l-19 21M71 148l-20 20"/></g><path d="M52 136Q115 177 179 136L162 162Q111 190 68 161Z" fill="#c95765" stroke="#ffdc90" stroke-width="4"/><path d="M115 134q-26-23 0-53 26 31 0 53Z" fill="#ffdb69"/><path d="M115 104q-7 15 0 24 10-13 0-24Z" fill="#fff9b6"/><g fill="#ffcc79"><circle cx="52" cy="63" r="6"/><circle cx="178" cy="63" r="6"/><circle cx="115" cy="35" r="6"/></g>';
 }else if(id==='merdeka'||id==='malaysia'){
 art='<path d="M35 36v135" stroke="#f2db9a" stroke-width="5"/><path d="M40 40q55-20 145 5v83q-71-24-145-1Z" fill="#f9f9ef"/><path d="M40 48q56-20 145 4M40 67q56-20 145 4M40 86q56-20 145 4M40 105q56-20 145 4" stroke="#d52f47" stroke-width="10"/><path d="M40 41q38-14 86-2v51q-42-10-86 2Z" fill="#142e78"/><path d="M100 48a19 19 0 1 0 0 30 17 17 0 1 1 0-30" fill="#ffdf5e"/><path d="m102 42 3 8 8-1-5 7 5 7-8-2-3 8-2-8-8 2 5-7-5-7 8 1Z" fill="#ffe26c"/><g fill="#f5c78a" transform="translate(156 154)"><ellipse rx="11" ry="28" transform="rotate(0)"/><ellipse rx="11" ry="28" transform="rotate(72)"/><ellipse rx="11" ry="28" transform="rotate(144)"/><ellipse rx="11" ry="28" transform="rotate(216)"/><ellipse rx="11" ry="28" transform="rotate(288)"/><circle r="11" fill="#a94342"/></g>';
 }else if(id==='christmas'){
 art='<path d="M117 23 58 94h34l-43 49h47l-22 32h86l-22-32h47l-43-49h34Z" fill="#327554" stroke="#f5d48c" stroke-width="4"/><path d="M115 24v145" stroke="#87bc85" stroke-opacity=".5" stroke-width="6"/><path d="M114 11l7 13 14 1-10 10 2 14-13-7-12 7 2-14-10-10 14-1Z" fill="#ffe4a0"/><g fill="#ed5862"><circle cx="83" cy="101" r="7"/><circle cx="146" cy="126" r="7"/><circle cx="105" cy="151" r="7"/></g><g fill="#ffe8b4"><circle cx="134" cy="92" r="5"/><circle cx="79" cy="139" r="5"/><circle cx="115" cy="66" r="5"/></g><path d="M107 175v21h20v-21" fill="#976231"/>';
 }else if(id==='midautumn'){
 art='<circle cx="128" cy="85" r="59" fill="#f7d99a" stroke="#ffeac2" stroke-width="4"/><circle cx="105" cy="75" r="12" fill="#d8b980" opacity=".5"/><circle cx="145" cy="98" r="7" fill="#d8b980" opacity=".5"/><path d="M75 141Q121 111 173 144" stroke="#ffedae" stroke-width="4" fill="none"/><g transform="translate(84 117)" fill="#fff2d3"><ellipse cx="25" cy="22" rx="20" ry="23"/><ellipse cx="12" cy="-12" rx="8" ry="29" transform="rotate(-13)"/><ellipse cx="34" cy="-13" rx="8" ry="30" transform="rotate(14)"/><circle cx="37" cy="16" r="2.5" fill="#a67b65"/></g>';
 }else if(id==='wesak'){
 art=ring+'<g fill="#e8b8d8" stroke="#ffe2ee" stroke-width="2"><ellipse cx="115" cy="107" rx="19" ry="57"/><ellipse cx="115" cy="107" rx="19" ry="54" transform="rotate(40 115 145)"/><ellipse cx="115" cy="107" rx="19" ry="54" transform="rotate(-40 115 145)"/><ellipse cx="115" cy="107" rx="19" ry="48" transform="rotate(75 115 145)"/><ellipse cx="115" cy="107" rx="19" ry="48" transform="rotate(-75 115 145)"/></g><path d="M48 169q68 31 134 0" fill="none" stroke="#f3d897" stroke-width="7"/>';
 }else if(id==='gawai'||id==='kaamatan'){
 art='<g stroke="#f6d480" stroke-width="4" stroke-linecap="round" fill="none"><path d="M114 195Q85 112 37 38M116 195Q152 111 195 40M115 195Q119 86 116 18"/></g>';
 for(let i=0;i<6;i++){art+='<ellipse cx="'+(48+i*10)+'" cy="'+(52+i*17)+'" rx="8" ry="16" fill="#e1ba5c" transform="rotate(-36 '+(48+i*10)+' '+(52+i*17)+')"/><ellipse cx="'+(182-i*10)+'" cy="'+(52+i*17)+'" rx="8" ry="16" fill="#e1ba5c" transform="rotate(36 '+(182-i*10)+' '+(52+i*17)+')"/>';}
 art+='<path d="M76 161Q114 145 153 161l-10 27H85Z" fill="#9e6b3d" stroke="#f8d78d" stroke-width="4"/><path d="M79 171h72M90 184h51" stroke="#f8d78d" stroke-width="3"/>';
 }else{
 art='<circle cx="115" cy="92" r="54" fill="#f6d78c" opacity=".68"/><path d="M59 137q62-35 125 0" stroke="#e8bd6b" stroke-width="8" fill="none"/>';
 }
 return svg('0 0 230 220',d+art);
}
function motionSetting(){
 try{const x=localStorage.getItem(MOTION_KEY);return x==='off'||x==='subtle'||x==='full'?x:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'full');}catch{return 'subtle';}
}
let motion=motionSetting(),theme='',effectTimer=null;
function applyMotion(){
 const hero=document.getElementById('culture-showcase');if(hero)hero.dataset.motion=motion;
 document.documentElement.dataset.cultureMotion=motion;
}
function refresh(){
 const id=document.documentElement.dataset.culture||'imperial';if(theme===id)return;
 theme=id;const hero=document.getElementById('culture-showcase');if(!hero)return;
 const data=THEMES[id]||THEMES.imperial,china=id==='imperial'||id==='cny';
 const decorate=china?'<div class="cult-dragon">'+dragon()+'</div><div class="cult-lantern one">'+lantern()+'</div><div class="cult-lantern two">'+lantern()+'</div><div class="cult-character">'+caishen()+'</div>':'<div class="cult-motif">'+motif(id)+'</div>';
 hero.innerHTML='<div class="cult-scene">'+clouds()+'</div><div class="cult-corner left"></div><div class="cult-corner right"></div><div class="cult-confetti">'+Array.from({length:6},()=>'<i class="cult-spark"></i>').join('')+'</div><div class="cult-hero-copy"><div class="cult-kicker">'+data[0]+'</div><div class="cult-hero-title">'+data[1]+'</div><div class="cult-hero-sub">'+data[2]+'</div></div>'+decorate+'<div class="cult-hero-label">Cultural art · decorative only</div>';
 applyMotion();
}
function playRun(){
 if(motion==='off'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const fx=document.getElementById('culture-run-effect');if(!fx)return;
 const china=theme==='imperial'||theme==='cny';
 const pict=china?caishen():motif(theme);
 fx.innerHTML='<div class="cult-ring"></div><div class="cult-run-character">'+pict+'</div><div class="cult-mini-star">✧</div><div class="cult-mini-star">✦</div><div class="cult-mini-star">✧</div><div class="cult-run-caption">ANALYZING HISTORY</div>';
 if(effectTimer)clearTimeout(effectTimer);
 fx.classList.remove('is-running');void fx.offsetWidth;fx.classList.add('is-running');
 effectTimer=setTimeout(()=>{fx.classList.remove('is-running');fx.textContent='';},motion==='subtle'?900:1550);
}
function attachSetting(){
 const dialog=document.getElementById('culture-dialog'),choice=document.getElementById('culture-choice');
 if(!dialog||!choice||document.getElementById('culture-motion'))return;
 const label=document.createElement('label');label.htmlFor='culture-motion';label.textContent='Character & decorative motion';
 const sel=document.createElement('select');sel.id='culture-motion';
 for(const [key,name] of [['full','Full animations · flying dragon & glowing effects'],['subtle','Subtle animations · slower movement'],['off','Off · static illustrations']]){const opt=document.createElement('option');opt.value=key;opt.textContent=name;sel.appendChild(opt);}
 sel.value=motion;choice.insertAdjacentElement('afterend',sel);sel.insertAdjacentElement('beforebegin',label);
 const note=document.createElement('p');note.textContent='Decorations are visual only and cannot affect draw results. Reduced-motion device settings always take priority.';sel.insertAdjacentElement('afterend',note);
 // Save directly when adjusted, independent of the Cultural Theme save button.
 sel.addEventListener('change',()=>{motion=sel.value;try{localStorage.setItem(MOTION_KEY,motion);}catch{}applyMotion();});
}
function init(){
 const header=document.querySelector('.header');
 if(!header||document.getElementById('culture-showcase'))return;
 const hero=document.createElement('section');hero.id='culture-showcase';hero.setAttribute('aria-label','Illustrated cultural theme banner');header.insertAdjacentElement('afterend',hero);
 const fx=document.createElement('div');fx.id='culture-run-effect';fx.setAttribute('aria-hidden','true');document.body.appendChild(fx);
 const sync=()=>refresh();
 new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-culture']});
 refresh();attachSetting();applyMotion();
 document.addEventListener('beast:prediction-start',playRun);
 // Welcome flight stays inside the banner and never blocks interface controls.
 if(motion==='full'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const flyer=document.createElement('div');flyer.className='cult-welcome-flyer';flyer.innerHTML=(theme==='imperial'||theme==='cny')?dragon():motif(theme);hero.appendChild(flyer);
  setTimeout(()=>flyer.remove(),5800);
 }
 document.addEventListener('visibilitychange',()=>{const el=document.getElementById('culture-run-effect');if(document.hidden&&el)el.classList.remove('is-running');});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
