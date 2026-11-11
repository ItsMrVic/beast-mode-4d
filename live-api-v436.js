/* BEAST MODE 4D v4.36 — verified live result feed.
   Data: https://4dlivetoday.com/api/v1/latest (CC BY 4.0).
   Only complete, checked draw boards can be saved. */
(function () {
  'use strict';
  const BASE='https://4dlivetoday.com/api/v1';
  const POLL_MS=120000;
  const ALIASES={
    magnum:'MAGNUM',magnum4d:'MAGNUM',
    toto:'TOTO',sportstoto:'TOTO',sportstoto4d:'TOTO',
    damacai:'DAMACAI',damacai13d:'DAMACAI',dmc:'DAMACAI'
  };
  let inFlight=null;
  let lastAttempt=0;

  function normalise(row) {
    if (!row || String(row.status||'').toLowerCase()!=='checked') return null;
    const key=String(row.operator||row.operator_name||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    const operator=ALIASES[key];
    if (!operator) return null;
    // Keep prize numbers as strings: leading zeros are significant.
    const candidate={
      operator,date:row.date,status:'checked',
      top3:[row.first,row.second,row.third],
      special:row.special,consolation:row.consolation,
      source:'4dlivetoday.com'
    };
    const checked=vettedVerifiedBoard(candidate);
    if (!checked) return null;
    return {...candidate,day:checked.day};
  }
  function normaliseEnvelope(payload) {
    if (!payload || payload.source!=='4dlivetoday.com' ||
        !Array.isArray(payload.data?.results)) throw Error('Unexpected result source or format');
    const latest=new Map();
    for(const item of payload.data.results) {
      const record=normalise(item);
      if (record && (!latest.has(record.operator) || record.date>latest.get(record.operator).date)) {
        latest.set(record.operator,record);
      }
    }
    if (!latest.size) throw Error('No complete cross-checked 4D boards yet');
    return [...latest.values()];
  }
  async function getJSON(url) {
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),12000);
    try {
      const response=await fetch(url,{cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});
      if (!response.ok) throw Error('HTTP '+response.status);
      return await response.json();
    } finally {clearTimeout(timer);}
  }
  function setLiveStatus(value,online) {
    liveAutoStatus=value;
    liveAutoOnline=online;
    if (activeNav==='Live') renderLive();
  }
  function syncCheckedRows(rows) {
    let result=null, storageError=null;
    try {result=applyVerifiedBoards(rows);}
    catch (err) {storageError=err;console.warn('Live 4D results not saved; storage issue',err);}
    if(result && (result.added||result.repaired)){
      if(activeNav!=='Live')render();
      if(typeof b4dTicketNotice==='function') b4dTicketNotice();
    }
    return {result,storageError};
  }
  async function refreshLiveFeed(force=false) {
    if(document.hidden&&!force)return null;
    if(inFlight)return inFlight;
    if(!force && Date.now()-lastAttempt<60000)return null;
    lastAttempt=Date.now();
    setLiveStatus('Checking latest verified results…',liveAutoOnline);
    inFlight=(async()=>{
      try {
        const rows=normaliseEnvelope(await getJSON(BASE+'/latest'));
        // Do not overwrite a complete or manually entered draw on conflict.
        const {result,storageError}=syncCheckedRows(rows);
        for(const row of rows) {
          const previous=liveProviderResults[row.operator];
          if(!previous || row.date>=previous.date) liveProviderResults[row.operator]=row;
        }
        liveLastSynced=new Date().toISOString();
        const conflictNote=result?.conflicts?' · '+result.conflicts+' conflicting saved boards left unchanged':'';
        const saveNote=storageError?' · phone storage full: automatic save failed':'';
        setLiveStatus('Updated '+new Date().toLocaleTimeString('en-MY',{timeZone:'Asia/Kuala_Lumpur',hour:'2-digit',minute:'2-digit'})+
          ' MYT · '+rows.length+' verified operators'+conflictNote+saveNote,true);
        return rows;
      } catch (err) {
        console.warn('Live result API unavailable',err);
        // Saved local draws and bundled archive are displayed, never guessed.
        setLiveStatus('Live connection unavailable. Showing last saved results; tap Refresh to retry.',false);
        return null;
      } finally {inFlight=null;}
    })();
    return inFlight;
  }
  async function loadLiveDateFromAPI(date) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>malaysiaDateISO())return;
    try {
      const rows=normaliseEnvelope(await getJSON(BASE+'/results/'+date));
      const {storageError}=syncCheckedRows(rows);
      if(liveAutoLatest || liveDate!==date)return;
      for(const row of rows) {
        if(row.date!==date)continue;
        liveResults[row.operator]={...row};
        liveResultSources[row.operator]='4dlivetoday.com · checked';
      }
      liveAutoStatus=storageError?'Results loaded, but phone storage could not save them.':'Checked draw-date results loaded from 4dlivetoday.com';
      renderLive();
    }catch(err) {
      // A date with no draws, or a network failure, must not erase the local view.
      console.warn('Date-specific verified result lookup skipped',err);
    }
  }
  function showLatestLiveResults() {
    liveAutoLatest=true;
    renderLive();
    refreshLiveFeed(false);
  }
  window.refreshLiveFeed=refreshLiveFeed;
  window.loadLiveDateFromAPI=loadLiveDateFromAPI;
  window.showLatestLiveResults=showLatestLiveResults;
  // The PWA can refresh while it is open. When closed, refresh on next launch.
  setInterval(()=>{if(!document.hidden)refreshLiveFeed(false);},POLL_MS);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshLiveFeed(false);});
  window.addEventListener('pageshow',()=>refreshLiveFeed(false));
  refreshLiveFeed(false);
})();