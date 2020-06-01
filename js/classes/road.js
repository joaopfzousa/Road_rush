class Road extends Phaser.GameObjects.Container 
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0,0,"road");
        this.add(this.back);
        this.scene.add.existing(this);

        //this.back.displayWidth = game.config.width*.5;
        //this.back.scaleY = this.back.scaleX;

        Align.scaleToGameW(this.back, .5);

        this.setSize(this.back.displayWidth, game.config.height);

        console.log(this);

        this.lineGroup = this.scene.add.group();

        this.count = 0;

        //add car
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, "cars");
        Align.scaleToGameW(this.car, .10);
        this.add(this.car);

        this.power = 0;

        //add click
        this.back.setInteractive();
        //this.back.on('gameobjectmove', this.moveCar, this);

        this.back.on('pointerdown', this.startInvisible, this);
        this.back.on('pointerup', this.endInvisible, this);

        //add object
        this.addObject();

        emitter.emit(G.SET_SCORE, model.score);
    }

    startInvisible()
    {
        this.car.alpha = 0;
        this.scene.tweens.add({
            targets: this.car,
            duration: 1000
        });
       
    }

    endInvisible()
    {
        this.car.alpha = 1;
    }

    //criar as linhas no meio da estrada
    makeLines()
    {
        this.vSpace = this.displayHeight/10;
 
        for(var i = 0; i < 20; i++)
        {
            var line = this.scene.add.image(this.x, this.vSpace * i, "line");
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    //mover as linhas
    moveLines()
    {
        if(model.gameOver == true)
        {
            return;
        }

        this.lineGroup.children.iterate(function(child){
            child.y += this.vSpace/model.velocity;
        }.bind(this));

        this.count++;

        if(this.count == model.velocity)
        {
            this.count = 0;
            this.lineGroup.children.iterate(function(child){
                child.y = child.oy;
            }.bind(this));
        }
    }

    //O carro trocar de linhas (esquerda/direita)
    moveCar(cursors)
    {
        if(model.gameOver == true)
        {
            return;
        }

        mediaManager.playSound("whoosh");
        //emitter.emit(G.PLAY_SOUND, "whoosh");

        if(cursors.left.isDown){
            this.car.x = - this.displayWidth/4;
        }else if(cursors.right.isDown){
            this.car.x = this.displayWidth/4;
        }
        
        if(model.score >= 10)
        {
            if(cursors.down.isDown){
                this.car.y += 10;
            }else if(cursors.up.isDown){
                this.car.y -= 10;
            }
        }
    }

    //adiconar os vários objetos 
    addObject()
    {
        var objs = [
            {
                key:'pcar1',
                speed: model.velocity / 2, 
                scale:10
            }, 
            {
                key:'pcar2', 
                speed:model.velocity / 2, 
                scale:10
            }, 
            {
                key:'cone', 
                speed: model.velocity, 
                scale:5
            }, 
            {
                key:'barrier', 
                speed: model.velocity, 
                scale:8
            }
        ];
        var index = Math.floor(Math.random() * 4);
        var key = objs[index].key;
        var speed = objs[index].speed;
        var scale = objs[index].scale / 100;

        var lane = Math.random() * 100;

        this.object = this.scene.add.sprite(- this.displayWidth/4, 0, key);
        this.object.speed = speed;
        
        if(lane < 50)
        {
            this.object.x = this.displayWidth/4;
        }

        Align.scaleToGameW(this.object, scale);
        this.add(this.object);

        
        if(model.score >= 10)
        {
            this.object2 = this.scene.add.sprite(game.config.height/2, 0, key);
            this.object2.speed = speed;
            if(objs[index].key == 'pcar1' || objs[index].key == 'pcar2')
                this.object2.angle = -90;

            if(lane < 25)
            {
                this.object2.y = game.config.height/2.5;
            }else if(lane >= 25 ||lane <= 75 ){
                this.object2.y = game.config.height/1.5;
            }else if(lane > 75){
                this.object2.y = game.config.height/3.5;
            }

            Align.scaleToGameW(this.object2, scale);
            this.add(this.object2);
        }     
         
    }

    goGameOver()
    {
        this.scene.start("SceneOver");
    }

    goNextLevel()
    {
        this.scene.start("SceneWinner1");   
    }

    goNextLevel2()
    {
        this.scene.start("SceneWinner2");
    }

    goMainAfterWIn()
    {
        this.scene.start("SceneWinner3");
    }

    //mover os objetos
    moveObject()
    {
        if(model.gameOver == true)
        {
            return;
        }

        this.object.y += this.vSpace / this.object.speed;

        if(this.car.alpha != 0)
        {
            if(Collision.checkCollide(this.car, this.object) == true)
            {
                model.gameOver = true;
                emitter.emit(G.PLAY_SOUND, "boom");

                //girar o carro para tras
                this.scene.tweens.add({
                    targets: this.car,
                    duration: 1000, 
                    y: game.config.height, 
                    angle: -270
                });

                this.scene.time.addEvent({
                    delay: 2000,
                    callback: this.goGameOver, 
                    callbackScope: this.scene, 
                    loop: false
                });

            }

            if(this.object.y > game.config.height)
            {
                emitter.emit(G.UP_POINTS, 1);
                this.object.destroy();

                if( model.score == 5)
                {
                    this.scene.time.addEvent({
                        delay: 0,
                        callback: this.goNextLevel, 
                        callbackScope: this.scene, 
                        loop: false
                    });
                }

                if( model.score == 10)
                {
                    this.scene.time.addEvent({
                        delay: 0,
                        callback: this.goNextLevel2, 
                        callbackScope: this.scene, 
                        loop: false
                    });
                }

                if( model.score == 30)
                {
                    this.scene.time.addEvent({
                        delay: 0,
                        callback: this.goMainAfterWIn, 
                        callbackScope: this.scene, 
                        loop: false
                    });
                }

                this.addObject();
            }

            
            if(model.score >= 10)
            {
                this.object2.x += this.vSpace / this.object2.speed;
            }
        }
        
    }
}