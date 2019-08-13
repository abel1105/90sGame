import Phaser from 'phaser';
import Preloader from './scenes/preload';
import Start from './scenes/start';
import Play from './scenes/play';
import Finish from './scenes/finish';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 700,
  backgroundColor: '#fff',
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      x: 125,
      y: 0,
      width: 550,
      height: 670,
      gravity: { y: 0 }
    }
  },
  scene: [
    Preloader,
    Start,
    Play,
    Finish
  ]
};

const game = new Phaser.Game(config);
