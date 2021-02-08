export default class Controller{
    constructor(game, view){

        this.game = game;
        this.view = view;

        document.addEventListener('keydown', event =>{
            switch(event.keyCode){
                case 37: //left
                    game.movePieceLeft();
                    view.renderMainScreen(game.getState());
                    break;
        
                case 38: //up
                    game.rotatePiece();
                    view.renderMainScreen(game.getState());
                    break;
                    
                case 39: //right
                    game.movePieceRight();
                    view.renderMainScreen(game.getState());
                    break;
        
                case 40: //down
                    game.movePieceDown();
                    view.renderMainScreen(game.getState());
                    break;  
            }
        });
    }
}