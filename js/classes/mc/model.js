class Model 
{
    constructor() 
    {
        this._score = 0;
        this.soundOn = true;
        this._musicOn = true;
        this.gameOver = false;
        this._velocity = 20;
    }

    set musicOn(val) 
    {
        this._musicOn = val;
        console.log("music changed");
        //emitter.emit(G.MUSIC_CHANGED);
        mediaManager.musicChanged();
    }

    get musicOn() 
    {
        return this._musicOn;
    }

    set score(val)
    {
        this._score = val;
        console.log("Score updated!");
        emitter.emit(G.SCORE_UPDATED);
    }

    get score() 
    {
        return this._score;
    }

    set velocity(val) 
    {
        this._velocity = val;
        console.log("velocity changed");
    }

    get velocity() 
    {
        return this._velocity;
    }
}