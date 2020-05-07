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
    }

    create() 
    {
        //define our objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width - 50;
        this.sb.y = 50;

        console.log("Ready!");
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

        /*
        var flatButton = new FlatButton({
            scene: this, 
            key: 'button1',
            text: 'Fire!!',
            x: 240, 
            y: 100, 
            event: 'button_pressed', 
            params: 'fire_lasers', 
            textConfig: {
                color: 'black',
                fontSize: 30
            }
        });

        var flatButton2 = new FlatButton({
            scene: this, 
            key: 'button2',
            text: 'Destruct!!',
            x: 240, 
            y: 300, 
            event: 'button_pressed', 
            params: 'self_destruct'
        });

        emitter.on('button_pressed', this.buttonPressed, this);
        */
    }

    buttonPressed(params)
    {
        console.log(params);
    }

    update() 
    {
        //constant running loop
        this.road.moveLines();
        this.road.moveObject();
    }

}