class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload()
    {
        //load our images or sounds 

        //load progress
        this.bar = new Bar({
            scene: this, 
            x:240, 
            y:320
        });

        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {
            color: '#ffffff',
            fontSize: game.config.width/20
        });
        this.progText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgess, this);

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

        //load our images or sounds 
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("button2", "images/ui/buttons/2/2.png");
        this.load.image("titleBack", "images/titleBack.jpg");
        this.load.audio("background", ["audio/background.mp3", "audio/background.ogg"]);
        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");

        this.load.image("win", "images/YOU-WIN.png");
        this.load.image("lost", "images/YOU-Lost.png");

    }
    
    onProgess(value)
    {
        //console.log(value);
        var per = value*100;
        this.bar.setPercent(value);
        this.progText.setText(per + "%");
    }

    create()
    {
        console.log("SceneLoad!");
        this.scene.start("SceneTitle");
    }
}