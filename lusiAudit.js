// ...existing code...
(function(){
  if (window.__LUSI_AUDIT_MODULE) return;
  window.__LUSI_AUDIT_MODULE = true;

  function nowStack(){ return (new Error()).stack.split('\n')[2]||''; }
  function safePush(arr,v){ try{ arr.push(v); }catch(e){} }

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

  window.dumpLusiAudit = function(){ return {
    events: (window.__LUSI_AUDIT?.events||[]).slice(-1000),
    depth:  (window.__LUSI_AUDIT?.depth||[]).slice(-1000),
    ls:     (window.__LUSI_AUDIT?.ls||[]).slice(-1000)
  }; };

  window.restoreLusiAudit = function(){
    try { if (window.__orig_localStorage_setItem) { localStorage.setItem = window.__orig_localStorage_setItem; delete window.__orig_localStorage_setItem; } } catch(e){}
    try { const p = window.Phaser?.GameObjects?.Image?.prototype; if (p && p.__orig_setDepth) { p.setDepth = p.__orig_setDepth; delete p.__orig_setDepth; } } catch(e){}
    try { if (window.game && window.game.scene) Object.keys(window.game.scene).filter(k=>k.startsWith('__orig_')).forEach(k=>{ const name=k.replace('__orig_',''); window.game.scene[name]=window.game.scene[k]; delete window.game.scene[k]; }); } catch(e){}
    Object.keys(window).filter(k=>k.startsWith('__orig_')).forEach(k=>{ try{ const name=k.replace('__orig_',''); window[name]=window[k]; delete window[k]; }catch(e){} });
    window.__LUSI_AUDIT.installed = false;
    return 'restored';
  };
})();