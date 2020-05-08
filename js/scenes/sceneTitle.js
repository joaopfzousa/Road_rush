class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        //load our images or sounds 
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("titleBack", "images/titleBack.jpg");

        this.load.audio("background", ["audio/background.mp3", "audio/background.ogg"]);

        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
    }

    create() 
    {
        //define our objects
        console.log("SceneTitle!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene: this});
        //mediaManager.setBackgroundMusic('background');

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