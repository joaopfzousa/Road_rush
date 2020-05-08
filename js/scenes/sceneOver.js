class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        //load our images or sounds 
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("titleBack", "images/titleBack.jpg");
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