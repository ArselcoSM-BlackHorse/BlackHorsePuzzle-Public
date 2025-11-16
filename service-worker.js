// Import cache assets
importScripts('cache-assets.js');

const CACHE_NAME = 'blackhorse-seri1-v1-20251116-2';
//const urlsToCache = [
// 🎯 ASSETS UNTUK SERI 1 SAJA (10 PUZZLES)
const CORE_ASSETS = [
  './',
  './index.html',
  './phaser.min.js',
  './site.webmanifest',
  // Favicon files that already exist
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './favicon.ico'
];

// 🧩 SERI 1 GAME ASSETS (10 PUZZLE PIECES)
const SERI1_ASSETS = [
  // Core game files
  //'./assets/images/black-horse-base.png',
  //'./assets/images/background.png',
  //'./assets/images/grid-background.png',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Board_Game_Puzzle_Level_01.webp',
  // 10 puzzle pieces untuk Seri 1
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_01.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_02.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_03.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_04.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_05.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_06.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_07.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_08.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_09.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/Level01/Lv01_Hex_10.webp',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/UI/Black_Horse_Donation_Panel.png',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/UI/Black_Horse_Pu_qrcode.png',
  'https://backend-paypalblackhorsepuzzle.onrender.com/Puzzle-Assets/UI/Star_Bronze_Black_Horse.png',
  // UI elements
  './Puzzle-Assets/Level01/Lv01_Help_English_Page1.webp',
  './Puzzle-Assets/Level01/Lv01_Help_English_Page2.webp',
  './Puzzle-Assets/Level01/Lv01_Help_Indonesian_Page1.webp',
  './Puzzle-Assets/Level01/Lv01_Help_Indonesian_Page2.webp',
  './Puzzle-Assets/Level01/Lv01_Help_Other_Code.webp',
  './Puzzle-Assets/Level01/Lv01_Help_Other_Page1.webp',
  './Puzzle-Assets/Level01/Lv01_Help_Other_Page2.webp',
  './Puzzle-Assets/Level02/Board Game Puzzle Level-02.webp',
  './Puzzle-Assets/Screenshots/game_mobile_390x844.webp',
  './Puzzle-Assets/Screenshots/game_wide_1280x720.webp',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_beautiful_sunset.mp3',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_beautiful_easy_country_music_intro_outro.mp3',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_golden_sunset_piano.mp3',  
  './Puzzle-Assets/Sfx/music favorite/music_favorite_horsepower.mp3',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_musique_west_cowboy.mp3',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_old_west.mp3',
  './Puzzle-Assets/Sfx/music favorite/music_favorite_sunset_dreams.mp3',
  './Puzzle-Assets/Sfx/scenes/level01_1_herdhorses_guitar_intro_ident.mp3',
  './Puzzle-Assets/Sfx/scenes/level01_2 music_favorite_sunset_dreams.mp3',
  './Puzzle-Assets/Sfx/scenes/level02_cowboy_riding_on_the_horse.mp3',
  './Puzzle-Assets/Sfx/scenes/splash01_music_cinematic.mp3',
  './Puzzle-Assets/Sfx/scenes/splash02_music_cowboy_western_background.mp3',
  './Puzzle-Assets/Sfx/scenes/win_in_the_video_game.mp3',
  './Puzzle-Assets/Sfx/sound/blackhorse_gallop.mp3',
  './Puzzle-Assets/Sfx/sound/game_over_elements_impact.mp3',
  './Puzzle-Assets/Sfx/sound/herd_gallop.mp3',
  './Puzzle-Assets/Sfx/sound/hoof_run.mp3',
  './Puzzle-Assets/Sfx/sound/hoof_step.mp3',
  './Puzzle-Assets/Sfx/sound/horse_neigh.mp3',
  './Puzzle-Assets/Sfx/sound/horse_snort.mp3',
  './Puzzle-Assets/Splash/Anggrek.webp',
  './Puzzle-Assets/Splash/BlackHorseRun.webp',
  './Puzzle-Assets/Splash/BrownHorseRun01.webp',
  './Puzzle-Assets/Splash/BrownHorseRun02.webp',
  './Puzzle-Assets/Splash/BrownHorseRun03.webp',
  './Puzzle-Assets/Splash/Cover Black Horse and His Herd R300.webp',
  './Puzzle-Assets/Splash/Cover Blank.webp',
  './Puzzle-Assets/Splash/Cutting Grass.webp',
  './Puzzle-Assets/Splash/Flower orange red.webp',
  './Puzzle-Assets/Splash/Grain Dust.webp',
  './Puzzle-Assets/Splash/Grass01.webp',
  './Puzzle-Assets/Splash/Grass02.webp',
  './Puzzle-Assets/Splash/LadyHorseRun.webp',
  './Puzzle-Assets/Splash/Red Cactus Flower.webp',
  './Puzzle-Assets/Splash/Under Flower.webp',
  './Puzzle-Assets/Splash/Upper Flower.webp',
  './Puzzle-Assets/UI/Blank Black Horse Level01.webp',
  './Puzzle-Assets/UI/FA Appel1.webp',
  './Puzzle-Assets/UI/FA Appel2.webp',
  './Puzzle-Assets/UI/FA Appel3.webp',
  './Puzzle-Assets/UI/FA Appel4.webp',
  './Puzzle-Assets/UI/FC Carrot.webp',
  './Puzzle-Assets/UI/FG Grass04.webp',
  './Puzzle-Assets/UI/FN Not Blue Cyan.webp',
  './Puzzle-Assets/UI/FN Not Green.webp',
  './Puzzle-Assets/UI/FN Not Red.webp',
  './Puzzle-Assets/UI/FW Water1.webp',
  './Puzzle-Assets/UI/FW Water2.webp',
  './assets/images/buttons/FW Water3.webp',
  './Puzzle-Assets/UI/GM Back.webp',
  './Puzzle-Assets/UI/GM BH Head Angguk1.webp',
  './Puzzle-Assets/UI/GM BH Head Angguk2.webp',
  './Puzzle-Assets/UI/GM BH Head Angguk3.webp',
  './Puzzle-Assets/UI/GM BH Head Geleng1.webp',
  './Puzzle-Assets/UI/GM BH Head Geleng2.webp',
  './Puzzle-Assets/UI/GM BH Head Geleng3.webp',
  './Puzzle-Assets/UI/GM BH Head Geleng2_Kedip mata.webp',
  './Puzzle-Assets/UI/GM Black Horse Head1.webp',
  './Puzzle-Assets/UI/GM Black Horse Head2.webp',
  './Puzzle-Assets/UI/GM Claim Hat Coklat.webp',
  './Puzzle-Assets/UI/GM Claim Hat.webp',
  './Puzzle-Assets/UI/GM Cowboy_brown_hat_win.png',
  './Puzzle-Assets/UI/GM Help.webp',
  './Puzzle-Assets/UI/GM L01_10 Puzzle.webp',
  './Puzzle-Assets/UI/GM GM L01_20 Puzzle.webp',
  './Puzzle-Assets/UI/GM Next.webp',
  './Puzzle-Assets/UI/GM Play Light.webp',
  './Puzzle-Assets/UI/GM Play Light-1.webp',
  './Puzzle-Assets/UI/GM Play.webp',
  './Puzzle-Assets/UI/GM Slot Hexa01.webp',
  './Puzzle-Assets/UI/GM Slot Hexa02.webp',
  './Puzzle-Assets/UI/GM Slot Hexa03.webp',
  './Puzzle-Assets/UI/GM Slot Hexa04.webp',
  './Puzzle-Assets/UI/GM Slot Hexa05.webp',
  './Puzzle-Assets/UI/GM Slot Hexa06.webp',
  './Puzzle-Assets/UI/GM Slot Hexa07.webp',
  './Puzzle-Assets/UI/GM Slot Hexa08.webp',
  './Puzzle-Assets/UI/GM Slot Hexa09.webp',
  './Puzzle-Assets/UI/GM Slot Hexa10.webp',
  './Puzzle-Assets/UI/GM Sound On Light.webp',
  './Puzzle-Assets/UI/GM Sound Off Light.webp',
  './Puzzle-Assets/UI/GM Sound Off.webp',
  './Puzzle-Assets/UI/GM Sound On.webp',
  './Puzzle-Assets/UI/Sp Button Blue Level 01.webp',
  './Puzzle-Assets/UI/Sp Button Blue Level 02.webp',
  './Puzzle-Assets/UI/Sp Button Red Level 02.webp',
  './Puzzle-Assets/UI/Sp Text Level 01 Glow.webp',
  './Puzzle-Assets/UI/Sp Text Level 02 Glow Red.webp',
  './Puzzle-Assets/UI/Sp Text Level 02 Glow.webp',
  './Puzzle-Assets/UI/Text Level 01.webp',
  './Puzzle-Assets/UI/Text Level 02.webp'
  ];

// 🎯 GABUNG SEMUA ASSETS - SERI 1 ONLY
const ALL_CACHE_ASSETS = [...CORE_ASSETS, ...SERI1_ASSETS];

// Install Service Worker & Cache Files
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installing...');
  self.skipWaiting(); // Force immediate activation
  
  console.log('🔧 [ServiceWorker] Installing Black Horse Puzzle Seri 1...');
  console.log(`🧩 [ServiceWorker] Caching ${ALL_CACHE_ASSETS.length} assets for 10-puzzle game`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ [ServiceWorker] Cache opened successfully');
        
        // Cache files one by one to handle missing files gracefully
        return Promise.allSettled(
          ALL_CACHE_ASSETS.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`⚠️ [ServiceWorker] Failed to cache ${url}:`, error.message);
              return null; // Continue with other files
            });
          })
        );
      })
      .then((results) => {
        const successful = results.filter(result => result.status === 'fulfilled').length;
        const failed = results.filter(result => result.status === 'rejected').length;
        
        console.log(`✅ [ServiceWorker] Cached ${successful} assets successfully`);
        if (failed > 0) {
          console.warn(`⚠️ [ServiceWorker] Failed to cache ${failed} assets`);
        }
          self.skipWaiting(); // Force activate immediately
      })
      .catch((error) => {
        console.error('❌ [ServiceWorker] Cache installation failed:', error);
      })
  );
});

// Activate SW & Cleanup Old Caches
self.addEventListener('activate', (event) => {
  console.log('✅ [ServiceWorker] Activated - Black Horse Puzzle Seri 1 ready!');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Keep only current cache, delete old ones
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ [ServiceWorker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('🎯 [ServiceWorker] Cache cleanup completed');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch Strategy: Cache First, Network Fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip API calls (let them go to network)
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
             })
          .catch((error) => {
            console.warn('⚠️ [ServiceWorker] Network fetch failed:', error);
            // Return offline fallback if available
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// ✅ ADD CACHE CLEARING MESSAGE HANDLER
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 [ServiceWorker] Skipping waiting - updating to new version');
    self.skipWaiting();
  }
  
  //if (event.data && event.data.type === 'CLEAR_CACHE') {
   // console.log('🗑️ [ServiceWorker] Clearing cache on request...');
    
   // caches.keys().then((cacheNames) => {
    //  return Promise.all(
       // cacheNames.map((cacheName) => {
        //  return caches.delete(cacheName);
       // })
     // );
    //}).then(() => {
     // console.log('✅ [ServiceWorker] All cache cleared');
     // if (event.ports && event.ports[0]) {
     //   event.ports[0].postMessage({ success: true });
     // }
   // });
 // }

// ENHANCED CACHE CLEAR - PASTE DI F12 CONSOLE:
async function clearAllCaches() {
    console.log('🗑️ Starting comprehensive cache clear...');
    
    let serviceWorkerSuccess = false;
    
    // Try Service Worker first
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        try {
            const channel = new MessageChannel();
            
            const swClearPromise = new Promise((resolve) => {
                channel.port1.onmessage = function(event) {
                    resolve(event.data.success);
                };
                
                setTimeout(() => resolve(false), 3000); // 3 second timeout
            });
            
            navigator.serviceWorker.controller.postMessage(
                { type: 'CLEAR_CACHE' },
                [channel.port2]
            );
            
            serviceWorkerSuccess = await swClearPromise;
            
            if (serviceWorkerSuccess) {
                console.log('✅ Service Worker cache cleared successfully');
            } else {
                console.log('⚠️ Service Worker cache clear timeout or failed');
            }
        } catch (error) {
            console.log('❌ Service Worker cache clear error:', error);
        }
    }
    
    // Fallback or additional direct clear
    if (!serviceWorkerSuccess) {
        console.log('🔄 Executing direct cache clear...');
        
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => {
                        console.log('🗑️ Deleting cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
                console.log('✅ Direct cache clear completed');
            } catch (error) {
                console.log('❌ Direct cache clear error:', error);
            }
        }
    }
    
    // Clear localStorage related to cache
    try {
        //localStorage.removeItem('cacheVersion');
        //localStorage.removeItem('lastCacheUpdate');
        console.log('✅ Cache-related localStorage cleared');
    } catch (error) {
        console.log('❌ localStorage clear error:', error);
    }
    
    console.log('🔄 Cache clear complete - please refresh page');
}

// Execute the comprehensive clear
clearAllCaches();
});

console.log('🐎 Black Horse Puzzle Service Worker - Seri 1 (10 Puzzles) Loaded!');