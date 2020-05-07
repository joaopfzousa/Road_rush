class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        //load our images or sounds 
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
    }

    create() 
    {
        //define our objects
        console.log("SceneTitle!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.alignGrid = new AlignGrid({
            rows:11, 
            cols:11, 
            scene: this
        });

        //this.alignGrid.showNumbers();

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