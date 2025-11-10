// Lusi Audit Module via IIFE DevTools injectable
(function(){
  if (window.__LUSI_AUDIT_MODULE) return;
  window.__LUSI_AUDIT_MODULE = true;

  function nowStack(){ return (new Error()).stack.split('\n')[2]||''; }
  function safePush(arr,v){ try{ arr.push(v); }catch(e){} }

  // core audit container
  window.__LUSI_AUDIT = window.__LUSI_AUDIT || { events:[], depth:[], ls:[] };

  window.installLusiAudit = function installLusiAudit() {
    if (window.__LUSI_AUDIT.installed) return 'already';
    window.__LUSI_AUDIT.installed = true;
    const push = (tag,info)=> safePush(window.__LUSI_AUDIT.events, {t:Date.now(), tag, info, stack: nowStack()});
    const pushDepth = info=> safePush(window.__LUSI_AUDIT.depth, Object.assign({t:Date.now(),stack:nowStack()},info));
    const pushLS = (k,v)=> safePush(window.__LUSI_AUDIT.ls, {t:Date.now(), key:k, val:(typeof v==='string'? v.slice(0,800): String(v)).slice(0,800), stack: nowStack()});

    try {
      const mgr = window.game && window.game.scene;
      if (mgr) ['start','stop','wake','sleep','launch'].forEach(n=>{
        if (!mgr['__orig_'+n] && typeof mgr[n] === 'function') {
          mgr['__orig_'+n] = mgr[n];
          mgr[n] = function(...a){ push('[SCENE] '+n, a); return mgr['__orig_'+n].apply(this,a); };
        }
      });
    } catch(e){ push('[ERROR] scene-wrap', {e:e.message}); }

    try {
      ['restoreSceneState','applyFromSceneDataOrCache','saveRoundStarToCache','saveSceneState','saveScorePersistent','updateUserProgress']
      .forEach(fn=>{
        if (typeof window[fn] === 'function' && !window['__orig_'+fn]) {
          window['__orig_'+fn] = window[fn];
          window[fn] = function(...a){ push('[WRAP] '+fn, a.slice(0,5)); return window['__orig_'+fn].apply(this,a); };
        }
      });
    } catch(e){}

    try {
      if (!window.__orig_localStorage_setItem) {
        window.__orig_localStorage_setItem = localStorage.setItem.bind(localStorage);
        localStorage.setItem = function(k,v){ try{ pushLS(k,v); }catch(e){}; return window.__orig_localStorage_setItem(k,v); };
      }
    } catch(e){}

    try {
      const proto = window.Phaser?.GameObjects?.Image?.prototype;
      if (proto && !proto.__orig_setDepth) {
        proto.__orig_setDepth = proto.setDepth;
        proto.setDepth = function(d){
          try {
            const key = (this.texture && this.texture.key) ? String(this.texture.key) : (this.name||this.type||'obj');
            // ambil snapshot state Level01 jika tersedia
            const s = window.game?.scene?.getScene && window.game.scene.getScene('Level01Scene');
            const sceneState = s ? { level01Score: s.level01Score, starAlpha: s.starAlpha, starAwarded: s.starAwarded } : null;
            if (/star|starbronze|starBronzeBlackHorse/i.test(key) || this === (window.game?.scene?.getScene('Level01Scene')?.starBronzeBlackHorse)) {
              // sertakan sceneState supaya tracer tahu nilai starAlpha / starAwarded saat setDepth dipanggil
              pushDepth({ key, old: this.depth, new: d, scene: sceneState });
            }
          } catch(e){}
          return proto.__orig_setDepth.apply(this, arguments);
        };
      }
    } catch(e){}

    return 'installed';
  };

  // DUMP API: accessible from DevTools
  window.dumpLusiAudit = function(){ return {
    events: (window.__LUSI_AUDIT?.events || window.__LUSI_AUDIT.events || window.__LUSI_AUDIT.events || []).slice(-2000),
    depth:  (window.__LUSI_AUDIT?.depth  || window.__LUSI_AUDIT.depth  || []).slice(-2000),
    ls:     (window.__LUSI_AUDIT?.ls     || window.__LUSI_AUDIT.ls     || []).slice(-2000)
  }; };

  // convenience: copy dump to clipboard (Chrome)
  window.copyLusiAuditDumpToClipboard = function() {
    try {
      copy(JSON.stringify(window.dumpLusiAudit(), null, 2));
      return 'copied';
    } catch(e) { return 'copy-failed'; }
  };

  // mirror RT overlay logs (if present) into __LUSI_AUDIT.events for unified dumping
  (function mirrorRtToDump(){
    try {
      // ensure legacy container too
      window._LUSI_AUDIT = window._LUSI_AUDIT || { events: [] };

      // If RT namespace exists and has log(), wrap it to also push to __LUSI_AUDIT.events
      if (window._LUSI_AUDIT_RT && typeof window._LUSI_AUDIT_RT.log === 'function' && !window._LUSI_AUDIT_RT.__mirrored) {
        const orig = window._LUSI_AUDIT_RT.log.bind(window._LUSI_AUDIT_RT);
        window._LUSI_AUDIT_RT.log = function(tag, info){
          try {
            const txt = `[${new Date().toLocaleTimeString()}] ${tag}: ${typeof info === 'string' ? info : JSON.stringify(info)}`;
            safePush(window._LUSI_AUDIT.events, txt);
            safePush(window.__LUSI_AUDIT.events, txt);
          } catch(e){}
          try { return orig(tag, info); } catch(e){ return; }
        };
        window._LUSI_AUDIT_RT.__mirrored = true;
      }

      // also mirror direct RT events array into dump periodically (best-effort)
      if (window._LUSI_AUDIT_RT && Array.isArray(window._LUSI_AUDIT_RT.events) && !window._LUSI_AUDIT_RT.__poller) {
        window._LUSI_AUDIT_RT.__poller = setInterval(()=> {
          try {
            if (!Array.isArray(window._LUSI_AUDIT_RT.events)) return;
            window._LUSI_AUDIT_RT.events.slice(-200).forEach(e => safePush(window.__LUSI_AUDIT.events, e));
            // keep size bounded
            if (window.__LUSI_AUDIT.events.length > 5000) window.__LUSI_AUDIT.events.splice(0, window.__LUSI_AUDIT.events.length - 5000);
          } catch(e){}
        }, 1500);
      }
    } catch(e){}
  })();

  window.restoreLusiAudit = function(){
    try { if (window.__orig_localStorage_setItem) { localStorage.setItem = window.__orig_localStorage_setItem; delete window.__orig_localStorage_setItem; } } catch(e){}
    try { const p = window.Phaser?.GameObjects?.Image?.prototype; if (p && p.__orig_setDepth) { p.setDepth = p.__orig_setDepth; delete p.__orig_setDepth; } } catch(e){}
    try { if (window.game && window.game.scene) Object.keys(window.game.scene).filter(k=>k.startsWith('__orig_')).forEach(k=>{ const name=k.replace('__orig_',''); window.game.scene[name]=window.game.scene[k]; delete window.game.scene[k]; }); } catch(e){}
    Object.keys(window).filter(k=>k.startsWith('__orig_')).forEach(k=>{ try{ const name=k.replace('__orig_',''); window[name]=window[k]; delete window[k]; }catch(e){} });
    // stop RT poller if any
    try { if (window._LUSI_AUDIT_RT && window._LUSI_AUDIT_RT.__poller) { clearInterval(window._LUSI_AUDIT_RT.__poller); delete window._LUSI_AUDIT_RT.__poller; } } catch(e){}
    window.__LUSI_AUDIT.installed = false;
    return 'restored';
  };
})();