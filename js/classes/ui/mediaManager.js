class MediaManager
{
    constructor(config)
    {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }

    musicChanged() 
    {
        if (this.background)
        {
            if (model._musicOn == false) 
            {
                this.background.stop();
            } else {
                this.background.play();
            }
        }
    }

    playSound(key)
    {
        console.log("play sound");
        if(model._musicOn == true)
        {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
    }

    setBackgroundMusic(key)
    {
        console.log("play sound");
        if(model._musicOn == true)
        {
            var background = this.scene.sound.add(key, {
                volume: .5, 
                loop: true
            });
            background.play();
        }
        
    }
}