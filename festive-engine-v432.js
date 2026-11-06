/* BEAST MODE 4D v4.32 — Malaysia celebrations (presentation layer only).
   The date list distinguishes Malaysian public holidays from cultural observances.
   Variable dates are explicitly curated for 2026–27; do not extrapolate lunar dates.
   Sources: Malaysia.gov.my; MEF public holiday calendars (2026/2027); Sabah.gov.my.
   This file does not read or modify predictions, tickets, winnings, or draw history. */
(function () {
'use strict';
var scene=document.getElementById('b4d-festival-scene');
if(!scene)return;
var KEY_MODE='b4d_festival_mode', KEY_MOTION='b4d_festival_motion';
var KEY_STATE='b4d_festival_state_v432';
var STATES={MY:'Malaysia-wide',JHR:'Johor',KDH:'Kedah',KTN:'Kelantan',MLK:'Melaka',NSN:'Negeri Sembilan',PHG:'Pahang',PNG:'Pulau Pinang',PRK:'Perak',PLS:'Perlis',SBH:'Sabah',SWK:'Sarawak',SGR:'Selangor',TRG:'Terengganu',KUL:'Kuala Lumpur',LBN:'Labuan',PJY:'Putrajaya'};
var C={
newyear:['New Year’s Day','🎆','celebration',48,'A new year, new beginnings',0,1],
pongal:['Ponggal / Thai Pongal','🌾','harvest',60,'Tamil harvest thanksgiving',1,1],
israk:['Israk dan Mikraj','🌙','raya',67,'Commemoration and reflection',1,1],
thaipusam:['Thaipusam','🪔','deepavali',78,'Devotion and blessings',2,2],
wilayah:['Hari Wilayah Persekutuan','🏙️','patriotic',63,'Celebrating the Federal Territories',1,1],
cny:['Chinese New Year / Tahun Baharu Cina','🧧','cny',98,'Red lanterns, lion dance and good fortune',6,12],
chapgohmei:['Chap Goh Mei','🏮','cny',67,'Lanterns and the fifteenth lunar night',1,1],
ramadan:['Awal Ramadan','🌙','raya',74,'The beginning of the holy month',1,2],
nuzul:['Nuzul Al-Quran','📖','raya',73,'A time of spiritual reflection',1,1],
raya:['Hari Raya Aidilfitri','🌙','raya',99,'Ketupat, pelita and togetherness',5,7],
goodfriday:['Good Friday','🕊️','christian',76,'A day of reflection',1,1],
easter:['Easter Sunday','🌸','christian',68,'Joy, hope and renewal',0,1],
qingming:['Qingming / Cheng Beng','🌿','lotus',60,'Honouring ancestors and family',1,1],
labour:['Hari Pekerja / Labour Day','🛠️','patriotic',75,'Celebrating Malaysian workers',1,1],
wesak:['Hari Wesak','🪷','lotus',96,'Peace, compassion and lotus light',1,2],
arafah:['Hari Arafah','🕋','raya',77,'The day of Arafah',1,0],
haji:['Hari Raya Aidiladha','🌙','raya',94,'Sacrifice, generosity and devotion',2,3],
kaamatan:['Pesta Kaamatan','🌾','harvest',93,'Kotobian Tadau Tagazo Do Kaamatan',2,1],
gawai:['Hari Gawai Dayak','🪶','gawai',93,'Gayu Guru Gerai Nyamai',1,2],
agong:['Hari Keputeraan YDP Agong','👑','patriotic',80,'Honouring the Yang di-Pertuan Agong',0,1],
awalmuharram:['Awal Muharram / Maal Hijrah','🌙','raya',82,'Islamic New Year',1,1],
maulidur:['Maulidur Rasul','🌙','raya',84,'Commemorating the Prophet’s birthday',1,2],
merdeka:['Hari Kebangsaan / Merdeka','🇲🇾','patriotic',99,'Jalur Gemilang • Malaysia’s independence',7,3],
malaysia:['Hari Malaysia / Malaysia Day','🇲🇾','patriotic',99,'Unity across Peninsular Malaysia, Sabah and Sarawak',6,3],
deepavali:['Deepavali / Diwali','🪔','deepavali',100,'Festival of Lights • diyas and kolam',8,5],
christmas:['Hari Krismas / Christmas','🎄','christmas',98,'Stars, evergreen and joyful lights',5,4],
midautumn:['Mid-Autumn / Pesta Tanglung','🏮','moon',76,'Mooncakes, lanterns and reunion',2,2],
dragonboat:['Duanwu / Dragon Boat Festival','🐉','cny',70,'Dragon boats and Chinese heritage',1,1],
vaisakhi:['Vaisakhi','🌾','harvest',64,'Sikh and Punjabi harvest celebrations',1,1],
sarawakday:['Hari Sarawak','🪶','gawai',81,'Sarawak’s self-government anniversary',2,1],
sabahday:['Hari Sabah','🌺','harvest',79,'Sabah Day celebration',1,0],
heritagepenang:['Hari Bandar Warisan Dunia Georgetown','🏛️','patriotic',75,'George Town World Heritage City',1,1],
heritagemelaka:['Hari Melaka Bandaraya Bersejarah','🏛️','patriotic',74,'Melaka’s historic-city celebration',1,0],
independencemelaka:['Hari Pengisytiharan Kemerdekaan Melaka','🇲🇾','patriotic',68,'Melaka state observance',1,0],
teachers:['Hari Guru Malaysia','📚','celebration',46,'Celebrating our teachers',0,0],
children:['Hari Kanak-Kanak Sedunia','🎈','celebration',45,'Celebrating children',0,0],
stanne:['Pesta St Anne','🕯️','christian',59,'Celebration associated with Bukit Mertajam',2,1],
sanpedro:['Pesta San Pedro','⛵','celebration',55,'Melaka Portuguese community tradition',1,1],
dongzhi:['Dongzhi / Winter Solstice','🍡','moon',62,'Family reunion and tang yuan',1,1],
christmaseve:['Christmas Eve','⭐','christmas',67,'A season of warmth and gathering',0,0],
newyearseve:['New Year’s Eve','🎇','celebration',60,'Celebrating the year that was',0,0],
nsnbirthday:['Hari Keputeraan Yang di-Pertuan Besar NS','👑','royal',68,'Negeri Sembilan state holiday',0,0],
johorbirthday:['Hari Keputeraan Sultan Johor','👑','royal',68,'Johor state holiday',0,0],
trgbirthday:['Hari Keputeraan Sultan Terengganu','👑','royal',68,'Terengganu state holiday',0,0],
trginstallation:['Hari Ulang Tahun Pertabalan Sultan Terengganu','👑','royal',65,'Terengganu state holiday',0,0],
sabahgovernor:['Hari Jadi Yang di-Pertua Negeri Sabah','🌺','royal',65,'Sabah state holiday',0,0],
perlisbirthday:['Hari Keputeraan Raja Perlis','👑','royal',66,'Perlis state holiday',0,0],
holpahang:['Hari Hol Pahang','🕊️','royal',62,'Pahang state remembrance day',0,0],
kedahbirthday:['Hari Keputeraan Sultan Kedah','👑','royal',68,'Kedah state holiday',0,0],
penanggovernor:['Hari Jadi Yang di-Pertua Negeri Pulau Pinang','🏛️','royal',65,'Pulau Pinang state holiday',0,0],
johorhol:['Hari Hol Almarhum Sultan Iskandar','🕊️','royal',62,'Johor state remembrance day',0,0],
pahangbirthday:['Hari Keputeraan Sultan Pahang','👑','royal',68,'Pahang state holiday',0,0],
melakagovernor:['Hari Jadi Yang di-Pertua Negeri Melaka','🏛️','royal',65,'Melaka state holiday',0,0],
kelantanbirthday:['Hari Keputeraan Sultan Kelantan','👑','royal',68,'Kelantan state holiday',0,0],
sarawakgovernor:['Hari Jadi Yang di-Pertua Negeri Sarawak','🪶','royal',65,'Sarawak state holiday',0,0],
perakbirthday:['Hari Keputeraan Sultan Perak','👑','royal',68,'Perak state holiday',0,0],
selangorbirthday:['Hari Keputeraan Sultan Selangor','👑','royal',68,'Selangor state holiday',0,0]
};
// Distinct visual identities; a Raya ketupat or Deepavali lamp must not represent unrelated festivals.
C.thaipusam[2]='thaipusam';
['israk','ramadan','nuzul','awalmuharram','maulidur'].forEach(function(x){C[x][2]='islamic';});
['arafah','haji'].forEach(function(x){C[x][2]='haji';});
var FIXED={
newyear:'01-01',wilayah:'02-01',independencemelaka:'02-20',
trginstallation:'03-04',johorbirthday:'03-23',trgbirthday:'04-26',
heritagemelaka:'04-15',vaisakhi:'04-14',labour:'05-01',
teachers:'05-16',perlisbirthday:'05-17',holpahang:'05-22',
kaamatan:'05-30',gawai:'06-01',sanpedro:'06-29',
heritagepenang:'07-07',sarawakday:'07-22',stanne:'07-26',
merdeka:'08-31',sabahday:'08-31',malaysia:'09-16',
kelantanbirthday:'09-29',selangorbirthday:'12-11',christmaseve:'12-24',
christmas:'12-25',newyearseve:'12-31',children:'11-20',dongzhi:'12-22',
nsnbirthday:'01-14'
};
// Officially listed 2026/27 movable dates and state ruler dates. Not extrapolated.
var DATED={
2026:{
pongal:'01-14',israk:'01-17',thaipusam:'02-01',cny:'02-17',
chapgohmei:'03-03',ramadan:'02-19',nuzul:'03-07',raya:'03-21',
qingming:'04-05',goodfriday:'04-03',easter:'04-05',
arafah:'05-26',haji:'05-27',wesak:'05-31',agong:'06-01',
awalmuharram:'06-17',dragonboat:'06-19',maulidur:'08-25',
midautumn:'09-25',deepavali:'11-08',
sabahgovernor:'03-30',kedahbirthday:'06-21',penanggovernor:'07-11',
johorhol:'07-21',pahangbirthday:'07-31',melakagovernor:'08-24',
sarawakgovernor:'10-10',perakbirthday:'11-06'
},
2027:{
pongal:'01-15',israk:'01-06',thaipusam:'01-22',cny:'02-06',
chapgohmei:'02-20',ramadan:'02-08',nuzul:'02-24',raya:'03-10',
qingming:'04-05',goodfriday:'03-26',easter:'03-28',
arafah:'05-16',haji:'05-17',wesak:'05-20',agong:'06-07',
awalmuharram:'06-06',dragonboat:'06-09',maulidur:'08-15',
midautumn:'09-15',deepavali:'10-28',
sabahgovernor:'03-30',kedahbirthday:'06-20',penanggovernor:'07-10',
johorhol:'07-11',pahangbirthday:'07-30',melakagovernor:'08-24',
sarawakgovernor:'10-09',perakbirthday:'11-05'
}
};
var STATE_ONLY={
wilayah:['KUL','LBN','PJY'],
israk:['KDH','NSN','PLS','TRG'],
thaipusam:['JHR','NSN','PNG','PRK','SGR','KUL','PJY'],
independencemelaka:['MLK'],trginstallation:['TRG'],
ramadan:['JHR','KDH'],nuzul:['KTN','PHG','PNG','PRK','PLS','SGR','TRG','KUL','LBN','PJY'],
goodfriday:['SBH','SWK'],arafah:['KTN','TRG'],
heritagepenang:['PNG'],heritagemelaka:['MLK'],sarawakday:['SWK'],sabahday:['SBH'],
stanne:['PNG'],sanpedro:['MLK'],nsnbirthday:['NSN'],johorbirthday:['JHR'],
trgbirthday:['TRG'],sabahgovernor:['SBH'],perlisbirthday:['PLS'],
holpahang:['PHG'],kedahbirthday:['KDH'],penanggovernor:['PNG'],
johorhol:['JHR'],pahangbirthday:['PHG'],melakagovernor:['MLK'],
kelantanbirthday:['KTN'],sarawakgovernor:['SWK'],perakbirthday:['PRK'],selangorbirthday:['SGR']
};
var REGIONAL_CULTURAL=['thaipusam','goodfriday','israk','nuzul','ramadan','arafah','kaamatan','gawai','sarawakday','sabahday','heritagepenang','heritagemelaka','stanne','sanpedro'];
var OBSERVANCE=new Set(['pongal','chapgohmei','qingming','easter','vaisakhi','teachers','children','stanne','sanpedro','dongzhi','midautumn','dragonboat','christmaseve','newyearseve']);
var COLORS={
chinese:['#3a0e1b','#8e242c','#ffd06e'],
cny:['#3d0a18','#a72531','#ffd979'],
deepavali:['#270d40','#8b356e','#ffcc78'],
raya:['#063e36','#13876e','#d9eab9'],
lotus:['#1b2445','#7356a2','#f6d5ed'],
harvest:['#34200e','#896331','#f7df8e'],
gawai:['#182e21','#527340','#f4d78d'],
patriotic:['#071e4b','#245fa8','#ffe47a'],
moon:['#172541','#5c518d','#ffdf9a'],
christmas:['#0a3830','#18704d','#ffdb9b'],
christian:['#243149','#556f9d','#f6e6bc'],
celebration:['#281b3f','#8558a5','#f5dfab'],
royal:['#262245','#665299','#edd58c'],islamic:['#092b37','#246573','#d8ddad'],haji:['#102d2b','#35786a','#f3da99'],thaipusam:['#3b1739','#a45f66','#f7d398']
};
// Draw the Jalur Gemilang from fixed 2:1 geometry rather than an approximate waving outline.
// 14 equal stripes (red first, white last), half-width blue canton eight stripes high,
// yellow crescent and 14-point federal star. Shared by Merdeka and Malaysia Day.
function jalurGemilangSVG(){
 var bars='';
 for(var i=0;i<14;i+=2)bars+='<rect x="22" y="'+(30+i*5)+'" width="140" height="5" fill="#cc0001"/>';
 var points=[];
 for(var j=0;j<28;j++){
  var a=-Math.PI/2+j*Math.PI/14,r=j%2===0?11.5:4.8;
  points.push((75+Math.cos(a)*r).toFixed(2)+','+(50+Math.sin(a)*r).toFixed(2));
 }
 return '<svg viewBox="0 0 180 150" aria-hidden="true">'+
  '<path d="M17 22v103" stroke="#e8c66f" stroke-width="4" stroke-linecap="round"/>'+
  '<circle cx="17" cy="22" r="4" fill="#f5db91"/>'+
  '<g class="fest-jalur-gemilang" data-stripes="14" data-star-points="14">'+
  '<rect x="22" y="30" width="140" height="70" fill="#fff"/>'+bars+
  '<rect x="22" y="30" width="70" height="40" fill="#010066"/>'+
  '<circle cx="46" cy="50" r="14" fill="#ffcc00"/>'+
  '<circle cx="52" cy="50" r="11.5" fill="#010066"/>'+
  '<polygon points="'+points.join(' ')+'" fill="#ffcc00"/>'+
  '<rect x="22" y="30" width="140" height="70" fill="none" stroke="#d5c7aa" stroke-width=".45"/>'+
  '</g></svg>';
}
var ICONS={
deepavali:'<svg viewBox="0 0 180 150" aria-hidden="true"><g fill="none" stroke="#f8c671" stroke-width="2.5"><circle cx="90" cy="70" r="52" opacity=".6"/><circle cx="90" cy="70" r="37" opacity=".5"/><path d="M90 8v23M90 109v22M27 70h24m78 0h24M45 26l16 16m58 58 16 16m0-90-16 16m-58 58-16 16"/></g><g fill="#e8a2d5" opacity=".86"><ellipse cx="90" cy="26" rx="7" ry="14"/><ellipse cx="90" cy="114" rx="7" ry="14"/><ellipse cx="46" cy="70" rx="14" ry="7"/><ellipse cx="134" cy="70" rx="14" ry="7"/></g><path d="M45 99q45 34 90 0l-12 24q-33 18-66 0z" fill="#e49342" stroke="#ffe49d" stroke-width="3"/><path d="M90 99q-24-23 0-54 23 32 0 54z" fill="#ffe36f"/><path d="M90 75q-9 12 0 22 8-12 0-22z" fill="#fff9c0"/></svg>',
raya:'<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M104 18a48 48 0 1 0 40 77 43 43 0 0 1-40-77z" fill="#ffe49e"/><path d="m141 22 6 13 14 2-11 10 2 14-11-7-13 7 3-14-10-10 14-2z" fill="#fff0b8"/><path d="M62 95 99 60 136 95 99 130Z" fill="#5fc795" stroke="#f2dc98" stroke-width="3"/><path d="M62 95h74M99 60v70M80 78l37 35m0-35-37 35" stroke="#eaf5c5" stroke-width="4"/></svg>',
lotus:'<svg viewBox="0 0 180 150" aria-hidden="true"><g fill="#eeb9de" stroke="#ffe6f5" stroke-width="2"><ellipse cx="90" cy="70" rx="18" ry="49"/><ellipse cx="90" cy="79" rx="17" ry="43" transform="rotate(38 90 100)"/><ellipse cx="90" cy="79" rx="17" ry="43" transform="rotate(-38 90 100)"/><ellipse cx="90" cy="90" rx="16" ry="37" transform="rotate(65 90 106)"/><ellipse cx="90" cy="90" rx="16" ry="37" transform="rotate(-65 90 106)"/></g><path d="M33 124q57 18 114 0" fill="none" stroke="#f9d89d" stroke-width="5"/></svg>',
patriotic:jalurGemilangSVG(),
harvest:'<svg viewBox="0 0 180 150" aria-hidden="true"><g fill="none" stroke="#ffd98c" stroke-width="4"><path d="M92 133Q75 62 37 26M92 133q21-75 54-112M92 133V18"/></g><g fill="#e9c46f"><ellipse cx="57" cy="45" rx="8" ry="15" transform="rotate(-30 57 45)"/><ellipse cx="67" cy="66" rx="8" ry="15" transform="rotate(-30 67 66)"/><ellipse cx="124" cy="48" rx="8" ry="15" transform="rotate(30 124 48)"/><ellipse cx="113" cy="73" rx="8" ry="15" transform="rotate(30 113 73)"/><ellipse cx="93" cy="35" rx="8" ry="15"/><ellipse cx="93" cy="62" rx="8" ry="15"/></g></svg>',
gawai:'<svg viewBox="0 0 180 150" aria-hidden="true"><g stroke="#f0d08b" stroke-width="3" fill="none"><path d="M40 116 90 21 140 116 90 136Z"/><path d="M59 112 90 49 121 112 90 126Z"/><path d="m40 116 100 0m-50-95v115"/></g><path d="M90 21q-23-17-36 0 23-4 36 0m0 0q23-17 36 0-23-4-36 0" fill="#ecce83"/><path d="M60 95q30-40 60 0" stroke="#f7e9bc" stroke-width="5" fill="none"/></svg>',
christmas:'<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M92 20 48 84h25l-33 34h103l-33-34h25z" fill="#3d8a63" stroke="#d6dda5" stroke-width="3"/><path d="M92 12l6 10 12 1-9 8 2 12-11-6-10 6 2-12-9-8 12-1z" fill="#ffe3a2"/><g fill="#f2b56f"><circle cx="77" cy="80" r="6"/><circle cx="111" cy="88" r="6"/><circle cx="91" cy="110" r="6"/></g></svg>'
};
ICONS.moon='<svg viewBox="0 0 180 150" aria-hidden="true"><circle cx="93" cy="62" r="44" fill="#ffe1a0"/><circle cx="77" cy="45" r="7" fill="#c8b58c" opacity=".45"/><path d="M53 100Q96 91 140 109" stroke="#ffdfac" stroke-width="3" fill="none"/><path d="M108 93v14M91 107h34" stroke="#f8d1a5" stroke-width="3"/><ellipse cx="108" cy="118" rx="19" ry="19" fill="#cd474d" stroke="#f5ca83" stroke-width="3"/><path d="M108 102v34m-14-19h28" stroke="#ffe2a0" stroke-width="2"/></svg>';
ICONS.islamic='<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M96 17a48 48 0 1 0 39 77 43 43 0 0 1-39-77z" fill="#f6dc9f"/><path d="m145 30 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" fill="#fff0bb"/><path d="M38 130V98l20-14 20 14v32M96 130V88l22-18 22 18v42" fill="none" stroke="#cde7d3" stroke-width="4"/><path d="M113 70q5-19 11 0" stroke="#fff0b9" stroke-width="3" fill="none"/></svg>';
ICONS.haji='<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M101 20a40 40 0 1 0 31 62 35 35 0 0 1-31-62z" fill="#f5daa1"/><path d="M53 81l39-16 39 16v50l-39 13-39-13z" fill="#171f24" stroke="#e9c379" stroke-width="3"/><path d="M53 94l39 13 39-13m-39 13v37" stroke="#f1d393" stroke-width="5" fill="none"/></svg>';
ICONS.thaipusam='<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M90 20v106" stroke="#f5d58f" stroke-width="5"/><path d="M90 10l-10 22 10-4 10 4z" fill="#ffe5ac"/><path d="M34 118q56-109 112 0" stroke="#d3a1d8" stroke-width="7" fill="none"/><path d="M46 115q44-78 88 0" stroke="#e8c18d" stroke-width="5" fill="none"/><path d="M62 75q26-34 55 0" stroke="#e9d8ae" stroke-width="3" fill="none"/><g fill="#5ac8ac"><circle cx="50" cy="86" r="7"/><circle cx="131" cy="86" r="7"/></g></svg>';
ICONS.christian='<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M90 27v105M59 67h62" stroke="#f3dfa4" stroke-width="11" stroke-linecap="round"/><path d="M47 113q43-31 87 0" stroke="#f2c9d5" stroke-width="5" fill="none"/><path d="M27 105q19-26 33 0m60 0q19-26 33 0" stroke="#e0b4ca" stroke-width="3" fill="none"/></svg>';
ICONS.royal='<svg viewBox="0 0 180 150" aria-hidden="true"><path d="M35 49 52 93 92 112 130 93 148 49 115 74 92 32 67 74Z" fill="#e7bb6d" stroke="#ffdea1" stroke-width="5"/><path d="M46 111h92v17H46Z" fill="#b77c3e" stroke="#f6d68f" stroke-width="4"/><g fill="#e86b76"><circle cx="69" cy="87" r="6"/><circle cx="114" cy="87" r="6"/></g></svg>';
ICONS.celebration='<svg viewBox="0 0 180 150" aria-hidden="true"><g stroke="#f4d596" fill="none" stroke-width="4"><path d="M90 28v28m0 26v28M49 69h28m26 0h28m-71-30 19 19m22 22 19 19m0-60-19 19m-22 22-19 19"/></g><g fill="#ffca84"><circle cx="90" cy="69" r="8"/><circle cx="35" cy="29" r="4"/><circle cx="143" cy="120" r="5"/></g></svg>';
function safeGet(k,d){try{return localStorage.getItem(k)||d;}catch(e){return d;}}
function safeSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function malaysiaDate(){var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());var m={};p.forEach(function(x){m[x.type]=x.value;});return m.year+'-'+m.month+'-'+m.day;}
function ordinal(s){return Date.parse(s+'T00:00:00Z')/86400000;}
function full(y,md){return String(y)+'-'+md;}
function eventsForYear(year){
 var data=Object.assign({},FIXED,DATED[year]||{}),out=[];
 Object.keys(data).forEach(function(id){if(!C[id])return;out.push({id:id,date:full(year,data[id]),title:C[id][0],emoji:C[id][1],visual:C[id][2],priority:C[id][3],desc:C[id][4],before:C[id][5],after:C[id][6],states:STATE_ONLY[id]||null,kind:OBSERVANCE.has(id)?'Cultural observance':(STATE_ONLY[id]?'State / local celebration':'Malaysian celebration'),provisional:!FIXED[id]&&year>=2027});});
 return out.sort(function(a,b){return a.date.localeCompare(b.date)||b.priority-a.priority;});
}
var region=safeGet(KEY_STATE,'MY');if(!STATES[region])region='MY';
var mode=safeGet(KEY_MODE,'auto');
if(['auto','manual','chinese'].indexOf(mode)<0)mode='auto';
var manualTheme=safeGet('b4d_festival_manual_theme_v433','deepavali');
if(!C[manualTheme]&&manualTheme!=='chinese')manualTheme='deepavali';
var motion=safeGet(KEY_MOTION,'on')!=='off';
var preview=null,dialog=null;
function resolve(date,selectedRegion){
 var d=ordinal(date),y=Number(date.slice(0,4)),s=selectedRegion||region,matching=[];
 [y-1,y,y+1].forEach(function(year){eventsForYear(year).forEach(function(e){
 if(e.states&&s!=='MY'&&e.states.indexOf(s)<0&&REGIONAL_CULTURAL.indexOf(e.id)<0)return;
 // Public-holiday status is state-specific, but Malaysian cultural festivals can be
 // celebrated and illustrated throughout the country.
 if(e.states&&s==='MY'&&REGIONAL_CULTURAL.indexOf(e.id)<0)return;
 var delta=d-ordinal(e.date);
 if(delta>=-e.before&&delta<=e.after)matching.push(Object.assign({delta:delta},e));
 });});
 matching.sort(function(a,b){var as=a.priority-Math.abs(a.delta)*6,bs=b.priority-Math.abs(b.delta)*6;return bs-as||Math.abs(a.delta)-Math.abs(b.delta)||a.id.localeCompare(b.id);});
 return matching[0]||null;
}
function themeById(id){
 if(id&&C[id])return {id:id,title:C[id][0],emoji:C[id][1],visual:C[id][2],desc:C[id][4]};
 return {id:'chinese',title:'Fortune & Prosperity',emoji:'🐉',visual:'chinese',desc:'Chinese-inspired fortune art • dragon, lanterns and God of Wealth'};
}
function chosenId(){if(preview!==null)return preview;return mode==='manual'?manualTheme:mode==='auto'?(resolve(malaysiaDate())||{id:'chinese'}).id:'chinese';}
function activeTheme(){return themeById(chosenId());}
function persistMode(next){mode=next;safeSet(KEY_MODE,mode);}
function getMode(){return mode;}
function setText(id,s){var n=document.getElementById(id);if(n)n.textContent=s;}
function apply(){
 var t=activeTheme(),visual=t.visual,col=COLORS[visual]||COLORS.chinese;
 document.body.dataset.festival=t.id;
 scene.dataset.festVisual=visual;
 scene.style.setProperty('--f-deep',col[0]);scene.style.setProperty('--f-aura',col[1]);scene.style.setProperty('--f-bright',col[2]);
 setText('b4d-fest-title',t.emoji+' '+t.title);
 setText('b4d-fest-desc',t.desc);
 setText('b4d-fest-kicker',(t.id==='chinese'?'🐉 中華福運 • FORTUNE EDITION':'MALAYSIA • CULTURAL CELEBRATIONS'));
 setText('b4d-fest-mode',mode==='manual'?'🎨 Manual theme':('🎊 Auto festivals: '+(mode==='auto'?'On':'Off')));
 setText('b4d-fest-motion','✨ Motion: '+(motion?'On':'Off'));
 scene.dataset.motion=motion?'on':'off';
 var art=scene.querySelector('#fest-v432-art');
 if(!art){art=document.createElement('div');art.id='fest-v432-art';art.className='fest-v432-art';art.setAttribute('aria-hidden','true');scene.appendChild(art);}
 if(art.dataset.rendered!==visual){
 art.dataset.rendered=visual;
 if(visual==='chinese'||visual==='cny'){art.textContent='';}
 else {
 var deco=ICONS[visual]||ICONS.celebration;
 var spark=visual==='deepavali'?['🪔','✨','🌼']:visual==='raya'?['🌙','✨','🌟']:visual==='lotus'?['🪷','✨','🌸']:visual==='harvest'?['🌾','🌻','✨']:visual==='gawai'?['🪶','🌾','✨']:visual==='patriotic'?['🇲🇾','⭐','✨']:visual==='christmas'?['⭐','🔔','✨']:['✦','✨','⭐'];
 art.innerHTML='<div class="fest-v432-emblem">'+deco+'</div>'+spark.map(function(g,i){return '<span class="fest-v432-spark fest-v432-spark-'+i+'">'+g+'</span>';}).join('');
 }
 }
}
function burst(){
 if(!motion||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var t=activeTheme();
 var glyphs={deepavali:['🪔','✨','🌸','✦'],raya:['🌙','✨','⭐','🌿'],gawai:['🌾','🪶','✨'],harvest:['🌾','🌻','✨'],lotus:['🪷','🌸','✨'],patriotic:['🇲🇾','⭐','✨'],christmas:['🎄','⭐','✨']};
 var chars=glyphs[t.visual]||[t.emoji,'✦','✨'];
 for(var i=0;i<12;i++){var el=document.createElement('span');el.className='b4d-fest-float';el.setAttribute('aria-hidden','true');el.textContent=chars[i%chars.length];el.style.left=(35+i*19%Math.max(100,scene.clientWidth-35))+'px';el.style.top=(70+i%4*15)+'px';el.style.setProperty('--dx',((i%2?1:-1)*(25+i*13%65))+'px');el.style.setProperty('--dy',(-50-i*13%90)+'px');el.style.animationDelay=(i%4*70)+'ms';scene.appendChild(el);el.addEventListener('animationend',function(){this.remove();},{once:true});}
 if(scene.querySelectorAll('.b4d-fest-float').length>40)scene.querySelectorAll('.b4d-fest-float').forEach(function(el){el.remove();});
}
function layout(){var pg=document.querySelector('.page.active'),open=pg&&(pg.id==='pgPredict'||pg.id==='pgWeekly');scene.classList.toggle('b4d-fest-collapsed',!open);}
function makeGalleryArt(visual){
 if(visual==='chinese'||visual==='cny'){
 return '<svg viewBox="0 0 200 146" aria-hidden="true"><g fill="none" stroke="#f5d48e" stroke-width="3"><path d="M0 118q30-17 57 0 24 14 48-3m26-14q35-22 69 0" opacity=".7"/><path d="M52 0v22m88-22v22"/></g><g fill="#bd283d" stroke="#f3c568" stroke-width="3"><ellipse cx="52" cy="62" rx="27" ry="38"/><ellipse cx="140" cy="62" rx="27" ry="38"/></g><g stroke="#ffd884" stroke-width="3" fill="none"><path d="M52 24v74m-16-67v65m32-65v65M140 24v74m-16-67v65m32-65v65M52 100v31m88-31v31"/></g><g fill="#ffebbd"><path d="M87 79q15-22 29-1l-15 23z"/></g><text x="101" y="139" fill="#ffe6ae" font-size="20" font-weight="bold" text-anchor="middle">福</text></svg>';
 }
 return ICONS[visual]||ICONS.celebration;
}
function renderModalPreview(){
 if(!dialog)return;
 var theme=activeTheme(),palette=COLORS[theme.visual]||COLORS.chinese;
 var card=document.getElementById('fest-v433-preview-card');
 if(!card)return;
 card.style.setProperty('--gallery-dark',palette[0]);
 card.style.setProperty('--gallery-mid',palette[1]);
 card.style.setProperty('--gallery-gold',palette[2]);
 var picture=document.getElementById('fest-v433-preview-art');
 picture.innerHTML=makeGalleryArt(theme.visual);
 setText('fest-v433-preview-title',theme.emoji+' '+theme.title);
 setText('fest-v433-preview-desc',theme.desc);
 setText('fest-v433-selected',mode==='manual'?'Saved: Manual theme':mode==='chinese'?'Saved: Everyday Chinese theme':'Saved: Automatic Malaysia calendar');
 document.getElementById('fest-v433-use').disabled=(preview===null);
}
function openCalendar(){
 if(!dialog){
 dialog=document.createElement('div');dialog.className='fest-v432-modal';dialog.id='fest-v432-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','Malaysian theme gallery and festive calendar');
 dialog.innerHTML='<div class="fest-v432-panel fest-v433-panel"><h2>🎨 Malaysian Theme Gallery</h2><p>Choose a celebration to see its artwork below, then tap <strong>Use This Theme</strong> to keep it. Your choice stays saved even after closing the app.</p><label for="fest-v432-state">Public holiday region</label><select id="fest-v432-state"></select><label for="fest-v432-preview">Choose a theme to preview</label><select id="fest-v432-preview"></select><div class="fest-v433-preview" id="fest-v433-preview-card"><div class="fest-v433-preview-visual" id="fest-v433-preview-art" aria-hidden="true"></div><div class="fest-v433-preview-copy"><strong id="fest-v433-preview-title"></strong><span id="fest-v433-preview-desc"></span></div><div class="fest-v433-preview-star fest-v433-preview-star-one">✦</div><div class="fest-v433-preview-star fest-v433-preview-star-two">✧</div></div><p class="fest-v433-status" id="fest-v433-selected"></p><div class="fest-v433-actions"><button id="fest-v433-use" class="fest-v433-primary" type="button">✓ Use This Theme</button><button id="fest-v433-auto" type="button">📅 Automatic</button><button id="fest-v433-default" type="button">🐉 Default Chinese</button><button id="fest-v432-close" type="button">✕ Close</button></div><details class="fest-v433-calendar-details"><summary>📆 Browse Malaysian celebration dates</summary><p id="fest-v432-current"></p><div class="fest-v432-list" id="fest-v432-list"></div><p class="fest-v432-foot">Dates curated for 2026–2027. Fixed annual dates continue; moving lunar and religious dates need refreshed official-year data. Regional celebrations are not necessarily nationwide public holidays. The illustrations are decorative only.</p></details></div>';
 document.body.appendChild(dialog);
 var sel=document.getElementById('fest-v432-state'),p=document.getElementById('fest-v432-preview');
 Object.keys(STATES).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=STATES[k];sel.appendChild(o);});
 var a=document.createElement('option');a.value='chinese';a.textContent='🐉 Everyday Chinese Prosperity';p.appendChild(a);
 Object.keys(C).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=C[k][1]+' '+C[k][0];p.appendChild(o);});
 sel.addEventListener('change',function(){region=sel.value;safeSet(KEY_STATE,region);renderCalendarList();});
 p.addEventListener('change',function(){preview=p.value;apply();renderModalPreview();});
 document.getElementById('fest-v433-use').addEventListener('click',function(){
   if(preview===null)return;
   manualTheme=preview;safeSet('b4d_festival_manual_theme_v433',manualTheme);
   persistMode('manual');closeCalendar();
 });
 document.getElementById('fest-v433-auto').addEventListener('click',function(){persistMode('auto');closeCalendar();});
 document.getElementById('fest-v433-default').addEventListener('click',function(){persistMode('chinese');closeCalendar();});
 document.getElementById('fest-v432-close').addEventListener('click',closeCalendar);
 dialog.addEventListener('click',function(e){if(e.target===dialog)closeCalendar();});
 dialog.addEventListener('keydown',function(e){if(e.key==='Escape')closeCalendar();});
 }
 document.getElementById('fest-v432-state').value=region;
 var id=mode==='manual'?manualTheme:mode==='auto'?(resolve(malaysiaDate())||{id:'chinese'}).id:'chinese';
 preview=id;
 document.getElementById('fest-v432-preview').value=id;
 renderCalendarList();dialog.classList.add('is-open');apply();renderModalPreview();
 document.getElementById('fest-v432-preview').focus();
}
function renderCalendarList(){
 if(!dialog)return;
 var today=malaysiaDate(),y=Number(today.slice(0,4));
 var list=eventsForYear(y).filter(function(e){return !e.states||region==='MY'||e.states.indexOf(region)>=0;});
 var holder=document.getElementById('fest-v432-list');holder.textContent='';
 var h=document.createElement('h3');h.textContent=y+' Malaysian celebrations ('+list.length+')';holder.appendChild(h);
 list.forEach(function(e){var row=document.createElement('div');row.className='fest-v432-item';var first=document.createElement('strong');first.textContent=e.emoji+' '+e.title;var detail=document.createElement('small');detail.textContent=e.date+' • '+e.kind+(e.states?' • '+e.states.map(function(x){return STATES[x];}).join(', '):'')+(e.provisional?' • subject to change':'');row.appendChild(first);row.appendChild(detail);holder.appendChild(row);});
 document.getElementById('fest-v432-current').textContent='Active today: '+(resolve(today)||{title:'Everyday Chinese-inspired fortune theme'}).title;
}
function closeCalendar(){if(!dialog)return;dialog.classList.remove('is-open');preview=null;apply();}
function init(){
 var mode=document.getElementById('b4d-fest-mode'),m=document.getElementById('b4d-fest-motion');
 if(mode)mode.addEventListener('click',function(){persistMode(getMode()==='auto'?'chinese':'auto');preview=null;apply();});
 if(m)m.addEventListener('click',function(){motion=!motion;safeSet(KEY_MOTION,motion?'on':'off');apply();});
 var controls=scene.querySelector('.b4d-fest-ctrl');
 if(controls&&!document.getElementById('fest-v432-open')){var b=document.createElement('button');b.type='button';b.id='fest-v432-open';b.className='b4d-fest-button';b.textContent='📅 Calendar';b.setAttribute('aria-label','Open Malaysian celebrations calendar and preview');b.addEventListener('click',openCalendar);controls.appendChild(b);}
 document.querySelectorAll('.page').forEach(function(pg){new MutationObserver(layout).observe(pg,{attributes:true,attributeFilter:['class']});});
 document.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var parent=b.closest('#pgPredict,#pgOracle,#pgWeekly');if(parent&&/(generate|predict now|run oracle|analy[sz]e week|run prediction)/i.test(b.innerText||b.textContent||''))burst();},false);
 document.addEventListener('visibilitychange',function(){if(!document.hidden)apply();});
 window.setInterval(function(){if(getMode()==='auto'&&preview===null)apply();},30*60*1000);
 apply();layout();
}
window.B4DFestiveV432=Object.freeze({resolve:resolve,eventsForYear:eventsForYear,refresh:apply,mode:getMode,theme:chosenId});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();