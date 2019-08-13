import Ball1 from '../../assets/Ball_01@2x.png';
import Ball2 from '../../assets/Ball_02@2x.png';
import Ball3 from '../../assets/Ball_03@2x.png';
import Ball4 from '../../assets/Ball_04@2x.png';
import Ball5 from '../../assets/Ball_05@2x.png';
import Boss1 from '../../assets/Boss_01@2x.png';
import Boss2 from '../../assets/Boss_02@2x.png';
import BtnLeftOff from '../../assets/btn_left_off@2x.png';
import BtnLeftOn from '../../assets/btn_left_on@2x.png';
import BtnRightOff from '../../assets/btn_right_off@2x.png';
import BtnRightOn from '../../assets/btn_right_on@2x.png';
import BtnStartOff from '../../assets/btn_start_off@2x.png';
import BtnStartOn from '../../assets/btn_start_on@2x.png'
import DuckLose from '../../assets/duck_lose@2x.png';
import Duck1 from '../../assets/duck_normal_01@2x.png';
import Duck2 from '../../assets/duck_normal_02@2x.png';
import Duck3 from '../../assets/duck_normal_03@2x.png';
import Duck from '../../assets/duck_normal_sprite.png';
import DuckSuper1 from '../../assets/duck_super_01@2x.png';
import DuckSuper2 from '../../assets/duck_super_02@2x.png';
import DuckSuper3 from '../../assets/duck_super_03@2x.png';
import DuckSuper from '../../assets/duck_super_sprite.png';
import Goal from '../../assets/Goal@2x.png';
import BgCenter from '../../assets/img_bg_center@2x.png';
import BgTop from '../../assets/img_bg_top.png';
import BgBottom from '../../assets/img_bg_bottom.png';
import SuperStar from '../../assets/SuperStar@2x.png';
import Clear1 from '../../assets/img_clear01@2x.png';
import Clear2 from '../../assets/img_clear02@2x.png';
import Clear3 from '../../assets/img_clear03@2x.png';

const Preloader = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { key: 'preloader' })
  },
  preload: function () {
    this.load.image('ball1', Ball1);
    this.load.image('ball2', Ball2);
    this.load.image('ball3', Ball3);
    this.load.image('ball4', Ball4);
    this.load.image('ball5', Ball5);

    this.load.image('boss1', Boss1);
    this.load.image('boss2', Boss2);

    this.load.image('btnLeftOff', BtnLeftOff);
    this.load.image('btnLeftOn', BtnLeftOn);
    this.load.image('btnRightOff', BtnRightOff);
    this.load.image('btnRightOn', BtnRightOn);

    this.load.image('btnStartOff', BtnStartOff);
    this.load.image('btnStartOn', BtnStartOn);

    this.load.image('duckLose', DuckLose);
    this.load.spritesheet('duck', Duck, { frameWidth: 370, frameHeight: 460 });
    this.load.spritesheet('duckSuper', DuckSuper, { frameWidth: 370, frameHeight: 460 });

    this.load.image('goal', Goal);

    this.load.image('bgCenter', BgCenter);
    this.load.image('bgTop', BgTop);
    this.load.image('bgBottom', BgBottom);

    this.load.image('superStar', SuperStar);

    this.load.image('clear1', Clear1);
    this.load.image('clear2', Clear2);
    this.load.image('clear3', Clear3);
  },
  create: function() {
    this.scene.start('start');
  }
});

export default Preloader;

// function index () {
//   this.load.image('ball1', Ball1);
//   this.load.image('ball2', Ball2);
//   this.load.image('ball3', Ball3);
//   this.load.image('ball4', Ball4);
//   this.load.image('ball5', Ball5);
//
//   this.load.image('boss1', Boss1);
//   this.load.image('boss2', Boss2);
//
//   this.load.image('btnLeftOff', BtnLeftOff);
//   this.load.image('btnLeftOn', BtnLeftOn);
//   this.load.image('btnRightOff', BtnRightOff);
//   this.load.image('btnRightOn', BtnRightOn);
//
//   this.load.image('btnStartOff', BtnStartOff);
//   this.load.image('btnStartOn', BtnStartOn);
//
//   this.load.image('duckLose', DuckLose);
//   this.load.spritesheet('duck', Duck, { frameWidth: 370, frameHeight: 460 });
//   this.load.spritesheet('duckSuper', DuckSuper, { frameWidth: 370, frameHeight: 460 });
//
//   this.load.image('goal', Goal);
//
//   this.load.image('bgCenter', BgCenter);
//   this.load.image('bgTop', BgTop);
//   this.load.image('bgBottom', BgBottom);
//
//   this.load.image('superStar', SuperStar)
// }

// export default index;