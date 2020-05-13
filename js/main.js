var game;
var model;
var emitter;
var G;
var controller;
var mediaManager;

window.onload=function()
{
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if(isMobile == -1)
    {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if(isMobile == -1)
    {
        var config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game',
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneWinner1, SceneWinner2, SceneLast, SceneWinner3]
        };
    }else{
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneLoad, SceneTitle, SceneMain, SceneOver, SceneWinner1, SceneWinner2, SceneLast, SceneWinner3]
        };
    }
	
    G = new Constants();
    model = new Model();
    this.model.isMobile = isMobile;
    game = new Phaser.Game(config);
}