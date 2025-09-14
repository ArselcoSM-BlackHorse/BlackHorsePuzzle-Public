export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const resume = new URLSearchParams(window.location.search).get('resume');

    if (resume === 'level01') {
      this.scene.start('Level01Scene');
    } else if (resume === 'level02') {
      this.scene.start('Level02Scene');
    } else {
      this.scene.start('SplashScene');
    }
  }
}
