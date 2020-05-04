class Road extends Phaser.GameObjects.Container 
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0,0,"road");
        this.add(this.back);
        this.scene.add.existing(this);

        //this.back.displayWidth = game.config.width*.5;
        //this.back.scaleY = this.back.scaleX;

        Align.scaleToGameW(this.back, .5);

        this.setSize(this.back.displayWidth, game.config.height);

        console.log(this);

        this.lineGroup = this.scene.add.group();

        this.count = 0;

        //add car
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, "cars");
        Align.scaleToGameW(this.car, .10);
        this.add(this.car);
    }

    //criar as linhas no meio da estrada
    makeLines()
    {
        this.vSpace = this.displayHeight/10;

        for(var i = 0; i < 20; i++)
        {
            var line = this.scene.add.image(this.x, this.vSpace * i, "line");
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    //mover as linhas
    moveLines()
    {
        this.lineGroup.children.iterate(function(child){
            child.y += this.vSpace/20;
        }.bind(this));

        this.count++;

        if(this.count == 20)
        {
            this.count = 0;
            this.lineGroup.children.iterate(function(child){
                child.y = child.oy;
            }.bind(this));
        }
    }
}