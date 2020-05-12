class SceneWinner1 extends Phaser.Scene {
    constructor() {
        super('SceneWinner1');
    }
    preload()
    {
       
    }

    create() 
    {
        //define our objects
        console.log("SceneWinner1!");

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
            key: 'button2',
            text: 'NEXT LEVEL!!',
            x: 240, 
            y: 100, 
            event: 'next_level', 
            params: 'fire_lasers', 
            textConfig: {
                color: 'black',
                fontSize: 20
            }
        });

        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('next_level', this.nextLevel, this);

        this.WinerText = this.add.text(game.config.width/2, game.config.height/2, "YOU WIN FIRST LEVEL", {
            color: '#000000',
            fontSize: game.config.width/20
        });
        this.WinerText.setOrigin(0.5, 0.5);
    }

    nextLevel()
    {
        this.scene.start('SceneMain');
    }

    update() 
    {
        //model.score = 0;
        //constant running loop
    }
}