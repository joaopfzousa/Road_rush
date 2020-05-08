class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load our images or sounds 
        //load estrada
        this.load.image("road", "images/road.jpg");
        this.load.image("line", "images/line.png");

        //load ator principal
        this.load.spritesheet("cars", "images/cars.png", {
            frameWidth: 60,
            frameHeight: 126
        });

        // load enimigos
        this.load.image("pcar1", "images/pcar1.png");
        this.load.image("pcar2", "images/pcar2.png");
        this.load.image("cone", "images/cone.png");
        this.load.image("barrier", "images/barrier.png");

        //load sound
        this.load.audio("boom", ["audio/boom.mp3", "audio/boom.ogg"]);
        this.load.audio("backgroundMusic", ["audio/random-race.mp3", "audio/random-race.ogg"]);
        this.load.audio("whoosh", ["audio/whoosh.mp3", "audio/whoosh.ogg"]);
    }

    create() 
    {
        //define our objects
        console.log("Ready!");

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});
        model.gameOver = false;

        //mediaManager.setBackgroundMusic('backgroundMusic');
        
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
    }

    update() 
    {
        //constant running loop
        this.road.moveLines();
        this.road.moveObject();
    }

}