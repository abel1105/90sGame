const Start = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, {key: 'start'});
  },
  create: function () {
    this.bgCenter = this.add.tileSprite(400, 350, 800, 700, 'bgCenter').setTileScale(1 / 3);
    this.bgBottom = this.add.image(400, 660, 'bgBottom').setScale(1 / 3);

    this.duck = this.physics.add.sprite(400, 580, 'duck').setScale(1 / 3);

    this.startBtn = this.add.image(0, 0, 'btnStartOff').setInteractive();
    this.startText = this.add.text(0, 0, 'Start', {fontSize: '60px'}).setOrigin(0.5, 0.5);
    this.start = this.add.container(400, 350, [this.startBtn, this.startText]);

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

export default Start;