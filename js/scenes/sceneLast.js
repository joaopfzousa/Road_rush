class SceneLast extends Phaser.Scene {
    constructor() {
        super('SceneLast');
    }

    create() 
    {
        //define our objects
        console.log("SceneLast!");

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});
        model.gameOver = false;

        this.road = new Road({scene:this});
        this.road.x = game.config.width/2;
        this.road.makeLines();

        this.alignGrid = new AlignGrid({
            rows: 5, 
            cols: 5, 
            scene: this
        });

        //this.alignGrid.showNumbers();
        var soundButtons = new SoundButtons({scene: this});

        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width/2;
        this.sb.y = 50;
        //this.alignGrid.placeAtIndex(4, this.sb);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() 
    {
        //constant running loop
        model.score = 10;
        this.road.moveCar(this.cursors);
        this.road.moveLines();
        this.road.moveObject();
    }
}