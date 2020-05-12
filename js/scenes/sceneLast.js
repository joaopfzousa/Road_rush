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
        this.road.x = game.config.width * .25;
        this.road.makeLines();

        this.road2 = new Road({scene:this});
        this.road2.x = game.config.width * .75;
        this.road2.makeLines();
        this.road2.car.setFrame(1);

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
    }

    update() 
    {
        //constant running loop
        this.road.moveLines();
        this.road.moveObject();

        this.road2.moveLines();
        this.road2.moveObject();
    }
}