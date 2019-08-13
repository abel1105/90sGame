const Finish = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, {key: 'finish'});
  },
  create: function () {
    this.boardTimeout = null;

    this.bgCenter = this.add.tileSprite(400, 350, 800, 700, 'bgCenter').setTileScale(1 / 3);
    this.bgTop = this.add.image(400, 40, 'bgTop').setScale(1 / 3);

    this.goal = this.add.image(430, 100, 'goal').setScale(1 / 3);

    this.duck = this.physics.add.sprite(400, 580, 'duck').setScale(1 / 3);

    this.tweens.timeline({
      tweens: [
        {
          targets: this.duck,
          y: 230,
          ease: 'Power1',
          duration: 2000
        }
      ]
    });
  },
  update: function () {
    if (!this.boardTimeout) {
      this.boardTimeout = setTimeout(() => {
        this.showBoard();
      }, 2000)
    }
  },
  showBoard: function () {
    this.board = this.add.graphics()
      .fillStyle(0xFFFFFF, 1)
      .fillRoundedRect(190, 200, 420, 300, 15);
    this.boardText = this.add.text(220, 220, 'Congratulations! 恭喜過關!', { color: '#FF952B', fontSize: 25 });
    setTimeout(() => {
      this.showFirstImg()
    }, 1000)
  },
  showFirstImg: function () {
    this.add.image(270, 330, 'clear1').setScale(1 / 3)
    setTimeout(() => {
      this.showSecondImg()
    }, 1000)
  },
  showSecondImg: function () {
    this.add.image(400, 330, 'clear2').setScale(1 / 3)
    setTimeout(() => {
      this.showThirdImg()
    }, 1000)
  },
  showThirdImg: function () {
    this.add.image(530, 330, 'clear3').setScale(1 / 3)
    setTimeout(() => {
      this.showBtn()
    }, 1000)
  },
  showBtn: function () {
    this.startBtn = this.add.image(0, 0, 'btnStartOff').setScale(1 / 2).setInteractive();
    this.startText = this.add.text(0, 0, '再來一次...', {fontSize: '20px'}).setOrigin(0.5, 0.5);
    this.start = this.add.container(400, 450, [this.startBtn, this.startText]);

    this.startBtn.on('pointerdown', function () {
      this.startBtn.setTexture('btnStartOn');
      this.startText.y += 2;
    }, this).on('pointerup', function () {
      this.startBtn.setTexture('btnStartOff');
      this.startText.y -= 2;
      this.scene.start('play');
    }, this);
  }

});

export default Finish;