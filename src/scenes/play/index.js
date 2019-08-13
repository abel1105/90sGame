import _ from 'lodash';

const Play = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { key: 'play' })
  },
  create: function() {
    // init
    this.gameover = false;
    this.superTimeout = null;
    this.startTime = null;
    this.nowTime = null;
    this.level = 1;
    // bg
    this.bgCenter = this.add.tileSprite(400, 350, 800, 700, 'bgCenter').setTileScale(1 / 3);
    this.bgBottom = this.add.image(400, 680, 'bgBottom').setScale(1 / 3);
    // balls
    this.balls = this.physics.add.group();
    this.balls.createMultiple({
      frameQuantity: 100,
      key: ['ball1', 'ball2', 'ball3', 'ball4', 'ball5'],
      randomKey: true,
      randomFrame: true,
      setScale: { x: 1/3, y: 1/3 },
      active: false,
      visible: false,
    });
    // duck
    this.duck = this.physics.add
      .sprite(400, 580, 'duck')
      .setSize(200, 200)
      .setScale(1 / 3)
      .setCollideWorldBounds(true)
      .setImmovable();
    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('duck', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'swimSuper',
      frames: this.anims.generateFrameNumbers('duckSuper', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });
    this.duck.anims.play('swim');
    // starts
    this.stars = this.physics.add.group();
    this.stars.createMultiple({
      frameQuantity: 100,
      key: 'superStar',
      setScale: { x: 1/3, y: 1/3 },
      active: false,
      visible: false
    });

    this.nextBallsAt = 0;
    // time
    this.timeRect = this.add.graphics()
      .fillStyle(0x262626, 1)
      .fillRoundedRect(0, 0, 150, 80, { tl: 0, tr: 0, bl: 10, br: 10 });
    this.timeRect.backgroundColor = '#262626';
    this.timeText = this.add.text(75, 45, '01:30', {fontSize: '40px', fontFamily: 'Roboto'}).setOrigin(0.5, 0.5);
    this.timeInfoText = this.add.text(30, 15, 'TIME', {fontSize: '7px', fontFamily: 'Roboto'}).setOrigin(0.5, 0.5);
    this.clock = this.add.container(650, 0, [this.timeRect, this.timeInfoText, this.timeText]);
    // physics
    this.physics.add.collider(this.balls, this.duck, this.hitEnemy, null, this);
    this.physics.add.collider(this.stars, this.duck, this.hitStar, null, this);
  },
  update: function (time, delta) {
    if (this.gameover) return false;

    this.hasShowSomething = false;

    // this.physics.overlap(this.balls, this.duck, this.hitEnemy, null, this);
    // time
    if (!this.startTime) {
      this.startTime = this.time.now;
      this.nowTime = this.time.now;
    } else {
      this.nowTime += delta;
    }
    const remainTime = Math.floor((90 * 1000 - (this.nowTime - this.startTime)) / 1000);

    if(remainTime === 60 && !this.boss1) {
      this.hasShowSomething = true;
      this.level += 1;
      this.showLittleBoss();
    }
    if(remainTime === 30 && !this.boss2) {
      this.hasShowSomething = true;
      this.level += 0.5;
      this.showBigBoss();
    }

    if(remainTime === 0) {
      this.end();
    }

    this.timeText.setText(`${_.padStart(Math.floor(remainTime / 60), 2, '0')}:${_.padStart(Math.floor(remainTime % 60), 2, '0')}`);

    // move left and right
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.duck.setVelocityX(-200 * this.level);
    } else if (cursors.right.isDown) {
      this.duck.setVelocityX(200  * this.level);
    } else {
      this.duck.setVelocityX(0);
    }
    // tile background
    this.bgCenter.tilePositionY -= this.superTimeout ? 10 * this.level : 2 * this.level;
    if (this.bgBottom.y < 750) this.bgBottom.y += 2;

    // balls
    if (this.nextBallsAt < this.nowTime && !this.hasShowSomething) {
      this.nextBallsAt = this.nowTime + (2500 / this.level);
      const showSuperStar = Phaser.Math.RND.between(0, 10) > 8;
      const target = showSuperStar ? this.stars : this.balls;
      target.getFirstDead()
        .setActive(true)
        .setVisible(true)
        .setPosition(Phaser.Math.RND.pick([180, 280, 380, 480, 580]), -20)
        .setVelocityY(100 * this.level)
        .setImmovable()
    } else if (this.hasShowSomething) {
      this.nextBallsAt = this.time.now + (5000 / this.level);
    }

  },
  hitEnemy: function (duck, enemy) {
    this.gameover = true;

    duck.anims.remove('swim');
    duck.setVelocityX(0).setTexture('duckLose');

    this.balls.getChildren().filter(item => item.active).forEach(item => {
      if(item.body) item.setVelocityY(0);
    });
    this.stars.getChildren().filter(item => item.active).forEach(item => {
      if(item.body) item.setVelocityY(0);
    });
    if(this.boss1 && this.boss1.body) this.boss1.setVelocityY(0);
    if(this.boss2 && this.boss2.body) this.boss2.setVelocityY(0);
    this.gameOver()
  },
  hitStar: function (duck, star) {
    star.setVisible(false);
    this.balls.getChildren().filter(item => item.active).forEach(item => {
      item.destroy();
    });
    if(this.boss1) this.boss1.destroy();
    if(this.boss2) this.boss2.destroy();
    duck.setTexture('duckSuper');
    duck.anims.remove('swim');
    duck.anims.play('swimSuper');

    if (this.superTimeout) {
      clearTimeout(this.superTimeout);
    }
    this.superTimeout = setTimeout(function () {
      duck.setTexture('duck');
      duck.anims.remove('swimSuper');
      duck.anims.play('swim');
      this.superTimeout = null;
    }.bind(this), 3000)
  },
  showLittleBoss: function() {
    // boss 1
    this.boss1 = this.physics.add.image(Phaser.Math.RND.pick([280, 380]), -200, 'boss1')
      .setScale(1/2)
      .setVelocityY(100 * this.level)
      .setImmovable();
    this.physics.add.collider(this.duck, this.boss1, this.hitEnemy, null, this);
  },
  showBigBoss: function() {
    // boss 2
    this.boss2 = this.physics.add.image(Phaser.Math.RND.pick([300, 500]), -200, 'boss2')
      .setScale(1/3)
      .setVelocityY(100 * this.level)
      .setImmovable();
    this.physics.add.collider(this.duck, this.boss2, this.hitEnemy, null, this);
  },
  end: function () {
    this.scene.start('finish');
  },
  gameOver: function () {
    this.board = this.add.graphics()
      .fillStyle(0xFFFFFF, 1)
      .fillRoundedRect(190, 200, 420, 200, 15);
    this.boardText = this.add.text(310, 230, 'UH-OH! 觸礁了', { color: '#FF952B', fontSize: 25 });
    this.boardInfo = this.add.text(270, 280, '勝敗乃鴨家常事，大俠重新來過吧~', { color: '#707070', fontSize: 18 });

    this.startBtn = this.add.image(0, 0, 'btnStartOff').setScale(1 / 2).setInteractive();
    this.startText = this.add.text(0, 0, '重新挑戰', {fontSize: '20px'}).setOrigin(0.5, 0.5);
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

export default Play;