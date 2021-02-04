export default class game{
        core = 0; //колличестов очков
        lines = 0; //сколько линий удалять
        level = 0; //уровни
        playfild = [//поле игры размером 10х20 будет предстваленно двумя массивами
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            
        ]; 
        
        // Активная фигура.
        activePiece = {
            x: 0,
            y: 0,
            blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
            ]
        };

        movePieceLeft(){
            this.activePiece.x -= 1;

            if(this.isPieceOutOfBounds()){  //не даёт выйти фигуре из поля
                this.activePiece.x +=1; 
            }
        } 

        movePieceRight(){
            this.activePiece.x += 1;
            
            if(this.isPieceOutOfBounds()){
                this.activePiece.x -= 1; 
            }
        } 

        movePieceDown(){
            this.activePiece.y += 1;
    
            if(this.isPieceOutOfBounds()){
                this.activePiece.y -= 1; 
                this.lockPiece();
            }
        } 

        isPieceOutOfBounds(){ //метод, который определет положение фигуры в поле
            const {y: pieceY, x: pieceX, blocks} = this.activePiece;

            for(let y = 0; y < blocks.length; y++){
                for(let x = 0; x < blocks[y].length; x++){  
                    if  ( blocks[y][x]  && //наличие блока в фигуре
                        (( this.playfild[pieceY + y] === undefined ||this.playfild[pieceY + y][pieceX + x] === undefined ) ||
                         this.playfild[pieceY + y][pieceX + x])){
                        return true;
                    }
                }
            }
            
            return false;
        }

        lockPiece(){
            const {y: pieceY, x: pieceX, blocks} = this.activePiece;

            for(let y = 0; y < blocks.length; y++){ //переберает ряды фигуры
                for(let x = 0; x < blocks[y].length; x++){ // перебирает внутри рядов 
                    if (blocks[y][x]){
                        this.playfild[pieceY+ y][pieceX + x] = blocks[y][x];
                    }   
                }
            }
        }
    } 
   
        

