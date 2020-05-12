class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        
    }

    create() 
    {
        //define our objects
        console.log("SceneOver!");

        this.alignGrid = new AlignGrid({
            rows:11, 
            cols:11, 
            scene: this
        });

        this.alignGrid.showNumbers();

        var titleBack = this.add.image(0, 0, 'titleBack');
        this.alignGrid.placeAtIndex(49, titleBack);

        var title = this.add.image(0, 0, 'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(27, title);

        var btnStart = new FlatButton({
            scene: this, 
            key: 'button1',
            text: 'Play Again!!',
            x: 240, 
            y: 100, 
            event: 'start_game', 
            textConfig: {
                color: 'black',
                fontSize: 20
            }
        });

        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this);

        var soundButtons = new SoundButtons({scene: this});


        this.WinerText = this.add.text(game.config.width/2, game.config.height/2, "YOU LOST", {
            color: '#000000',
            fontSize: game.config.width/20
        });
        this.WinerText.setOrigin(0.5, 0.5);

        model.velocity = 20;
        model.score = 0;
    }

    startGame()
    {
        this.scene.start('SceneMain');
    }

    update() 
    {
        //constant running loop
    }
}