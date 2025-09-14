/**
 * Black Horse Puzzle - Smart Loading System
 * Optimized loading untuk Sequential Pattern Puzzle
 */

class PuzzleLoadManager {
    constructor(scene) {
        this.scene = scene;
        this.loadedAssets = new Set();
        this.preloadQueue = [];
        this.loadingProgress = 0;
        this.totalAssets = 0;
        
        // Callback functions
        this.onProgress = null;
        this.onComplete = null;
    }

    /**
     * Load essential assets first (core game elements)
     */
    loadEssentials() {
        console.log('🚀 Loading essential assets...');
        
        // Core UI Elements
        this.scene.load.image('grid_left', this.getOptimalFormat('assets/ui/grid-left'));
        this.scene.load.image('grid_right', this.getOptimalFormat('assets/ui/grid-right'));
        this.scene.load.image('background', this.getOptimalFormat('assets/ui/background'));
        
        // Core Animations
        this.scene.load.spritesheet('shake_anim', this.getOptimalFormat('assets/animations/shake'), {
            frameWidth: 64,
            frameHeight: 64
        });
        this.scene.load.spritesheet('rotate_anim', this.getOptimalFormat('assets/animations/rotate'), {
            frameWidth: 64,
            frameHeight: 64
        });
        this.scene.load.spritesheet('fly_anim', this.getOptimalFormat('assets/animations/fly'), {
            frameWidth: 64,
            frameHeight: 64
        });
        
        // Sound Effects (compressed)
        this.scene.load.audio('click_correct', ['assets/audio/correct.webm', 'assets/audio/correct.mp3']);
        this.scene.load.audio('click_wrong', ['assets/audio/wrong.webm', 'assets/audio/wrong.mp3']);
        this.scene.load.audio('shake_sound', ['assets/audio/shake.webm', 'assets/audio/shake.mp3']);
        this.scene.load.audio('fly_sound', ['assets/audio/fly.webm', 'assets/audio/fly.mp3']);
        
        this.markAsLoaded('essentials');
    }

    /**
     * Preload puzzle pieces for specific level range
     */
    preloadPieces(startLevel, endLevel) {
        console.log(`🧩 Preloading pieces for levels ${startLevel}-${endLevel}...`);
        
        for(let level = startLevel; level <= endLevel; level++) {
            // Format level dengan leading zero (01, 02, 03, dst)
            const levelFormatted = this.formatLevel(level);
            
            // Load pieces untuk level ini
            for(let piece = 1; piece <= 9; piece++) { // Assuming 9 pieces per level
                const pieceFormatted = this.formatPiece(piece);
                const assetKey = `piece_${levelFormatted}_${pieceFormatted}`;
                const assetPath = this.getOptimalFormat(`assets/pieces/Level${levelFormatted}Scene/piece${pieceFormatted}`);
                
                this.scene.load.image(assetKey, assetPath);
                this.preloadQueue.push(assetKey);
            }
        }
        
        this.markAsLoaded(`levels_${startLevel}_${endLevel}`);
    }

    /**
     * Load theme assets (untuk premium themes)
     */
    loadTheme(themeName) {
        console.log(`🎨 Loading theme: ${themeName}...`);
        
        const themePath = `assets/themes/${themeName}`;
        
        // Theme-specific UI
        this.scene.load.image(`bg_${themeName}`, this.getOptimalFormat(`${themePath}/background`));
        this.scene.load.image(`grid_${themeName}`, this.getOptimalFormat(`${themePath}/grid`));
        
        // Theme music
        this.scene.load.audio(`music_${themeName}`, [
            `${themePath}/music.webm`,
            `${themePath}/music.mp3`
        ]);
        
        this.markAsLoaded(`theme_${themeName}`);
    }

    /**
     * Progressive loading dengan priority system
     */
    startProgressiveLoading(currentLevel) {
        // Load current level + next 2 levels
        this.preloadPieces(currentLevel, currentLevel + 2);
        
        // Background loading untuk level lebih jauh
        setTimeout(() => {
            if (currentLevel + 3 <= 100) { // Max 100 levels
                this.preloadPieces(currentLevel + 3, currentLevel + 5);
            }
        }, 2000);
    }

    /**
     * Get optimal image format (WebP with fallback)
     */
    getOptimalFormat(basePath) {
        if (this.supportsWebP()) {
            return `${basePath}.webp`;
        }
        return `${basePath}.webp`;
    }

    /**
     * Check WebP support
     */
    supportsWebP() {
        if (typeof this._webpSupport === 'undefined') {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            this._webpSupport = canvas.toDataURL('image/webp').indexOf('webp') > -1;
        }
        return this._webpSupport;
    }

    /**
     * Format level number dengan leading zero (1 → 01, 2 → 02)
     */
    formatLevel(levelNumber) {
        return levelNumber.toString().padStart(2, '0');
    }

    /**
     * Format piece number (1 → 1, atau bisa disesuaikan jika butuh leading zero)
     */
    formatPiece(pieceNumber) {
        // Jika mau piece juga pakai leading zero, ganti jadi:
        // return pieceNumber.toString().padStart(2, '0');
        return pieceNumber.toString();
    }

    /**
     * Get scene key berdasarkan level (1 → Level01Scene)
     */
    getSceneKey(levelNumber) {
        const levelFormatted = this.formatLevel(levelNumber);
        return `Level${levelFormatted}Scene`;
    }

    /**
     * Setup loading progress tracking
     */
    setupProgressTracking() {
        this.scene.load.on('progress', (value) => {
            this.loadingProgress = Math.round(value * 100);
            
            if (this.onProgress) {
                this.onProgress(this.loadingProgress);
            }
            
            console.log(`📈 Loading: ${this.loadingProgress}%`);
        });

        this.scene.load.on('complete', () => {
            console.log('✅ All assets loaded!');
            
            if (this.onComplete) {
                this.onComplete();
            }
        });
    }

    /**
     * Mark asset group as loaded
     */
    markAsLoaded(assetGroup) {
        this.loadedAssets.add(assetGroup);
        console.log(`✅ Loaded: ${assetGroup}`);
    }

    /**
     * Check if asset group is loaded
     */
    isLoaded(assetGroup) {
        return this.loadedAssets.has(assetGroup);
    }

    /**
     * Get loading statistics
     */
    getLoadingStats() {
        return {
            loadedGroups: Array.from(this.loadedAssets),
            queueLength: this.preloadQueue.length,
            progress: this.loadingProgress,
            webpSupport: this.supportsWebP()
        };
    }

    /**
     * Cleanup unused assets (memory optimization)
     */
    cleanupLevel(levelNumber) {
        const levelFormatted = this.formatLevel(levelNumber);
        
        // Remove pieces dari level yang sudah jauh tertinggal
        for(let piece = 1; piece <= 9; piece++) {
            const pieceFormatted = this.formatPiece(piece);
            const assetKey = `piece_${levelFormatted}_${pieceFormatted}`;
            
            if (this.scene.textures.exists(assetKey)) {
                this.scene.textures.remove(assetKey);
                console.log(`🗑️ Cleaned up: ${assetKey}`);
            }
        }
    }
}

/**
 * Loading Screen dengan Progress Bar
 */
class LoadingScreen {
    constructor(scene) {
        this.scene = scene;
        this.progressBar = null;
        this.progressText = null;
        this.loadingText = null;
    }

    create() {
        const { width, height } = this.scene.sys.game.config;
        
        // Background
        this.scene.add.rectangle(width/2, height/2, width, height, 0x000000, 0.8);
        
        // Title
        this.loadingText = this.scene.add.text(width/2, height/2 - 100, 'BLACK HORSE PUZZLE', {
            fontSize: '32px',
            fill: '#00ff00',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        // Loading text
        this.scene.add.text(width/2, height/2 - 50, 'Loading...', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Progress bar background
        this.scene.add.rectangle(width/2, height/2, 400, 20, 0x333333);
        
        // Progress bar
        this.progressBar = this.scene.add.rectangle(width/2 - 200, height/2, 0, 16, 0x00ff00);
        this.progressBar.setOrigin(0, 0.5);

        // Progress text
        this.progressText = this.scene.add.text(width/2, height/2 + 40, '0%', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    updateProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.width = (percentage / 100) * 400;
        }
        
        if (this.progressText) {
            this.progressText.setText(`${percentage}%`);
        }
    }

    destroy() {
        if (this.progressBar) this.progressBar.destroy();
        if (this.progressText) this.progressText.destroy();
        if (this.loadingText) this.loadingText.destroy();
    }
}

// Export untuk digunakan di game
window.PuzzleLoadManager = PuzzleLoadManager;
window.LoadingScreen = LoadingScreen;

console.log('🎮 Puzzle Loading System initialized!');
