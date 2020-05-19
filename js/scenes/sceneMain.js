class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        
    }

    create() 
    {
        //define our objects
        console.log("Ready!");

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});
        model.gameOver = false;
    
        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width - 50;
        this.sb.y = 50;

        this.road = new Road({scene:this});
        this.road.x = game.config.width/2;
        this.road.makeLines();

        this.alignGrid = new AlignGrid({
            rows: 5, 
            cols: 5, 
            scene: this
        });

        //this.alignGrid.showNumbers();
        this.alignGrid.placeAtIndex(4, this.sb);

    
        var soundButtons = new SoundButtons({scene: this});

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() 
    {
        //constant running loop
        this.road.moveCar(this.cursors);
        this.road.moveLines();
        this.road.moveObject();
    }

}