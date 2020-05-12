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

        var lost = this.add.image(0, 0, 'lost');
        Align.scaleToGameW(lost, .8);
        this.alignGrid.placeAtIndex(27, lost);

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