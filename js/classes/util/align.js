class Align {
    
    static scaleToGameW(obj, per)
    {
        obj.displayWidth = game.config.width*per;
        obj.scaleY = obj.scaleX;
    }

    //Colocar o objeto centrado
    static center(obj)
    {
        obj.x = game.config.width/2;
        obj.y = game.config.heigth/2;
    }

    //Colocar o Objeto no meio da largura
    static centerH(obj)
    {
        obj.x = game.config.width/2;
    }

     //Colocar o Objeto no meio da altura
    static centerV(obj)
    {
        obj.y = game.config.heigth/2;
    }
}