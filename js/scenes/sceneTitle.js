class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
       
    }

    create() 
    {
        //define our objects
        console.log("SceneTitle!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});
        ///mediaManager.setBackgroundMusic('background');

        this.alignGrid = new AlignGrid({
            rows:11, 
            cols:11, 
            scene: this
        });

        var titleBack = this.add.image(0, 0, 'titleBack');
        this.alignGrid.placeAtIndex(49, titleBack);

        var title = this.add.image(0, 0, 'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(27, title);

        var btnStart = new FlatButton({
            scene: this, 
            key: 'button1',
            text: 'Start Game!!',
            x: 240, 
            y: 100, 
            event: 'start_game', 
            params: 'fire_lasers', 
            textConfig: {
                color: 'black',
                fontSize: 20
            }
        });

        this.alignGrid.placeAtIndex(93, btnStart);

        var soundButtons = new SoundButtons({scene: this});
        //this.alignGrid.showNumbers();

        emitter.on('start_game', this.startGame, this);
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