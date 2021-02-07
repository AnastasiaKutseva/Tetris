export default class game {
    core = 0; //колличестов очков
    lines = 0; //сколько линий удалять
    level = 0; //уровни
    playfild = this.createPlayfild(); //поле игры размером 10х20 будет предстваленно двумя массивами


    // Активная фигура.
    activePiece = this.createPiece();
    nextPiece = this.createPiece();

    getState() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;
        const playfild = this.createPlayfild(); 

        for (let y = 0; y < this.playfild.length; y++) {
            playfild[y] = [];

            for (let x = 0; x < this.playfild[y].length; x++) {
                playfild[y][x] = this.playfild[y][x];
            }
        }
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfild[pieceY + y][pieceX + x] = blocks[y][x];
                }

            }

        }
        return { playfild };
    }

    createPlayfild() { //создает массив для игрового поля
        const playfild = [];

        for (let y = 0; y < 20; y++) {
            playfild[y] = [];

            for (let x = 0; x < 10; x++) {
                playfild[y][x] = 0;
            }
        }
        return playfild;
    }
    createPiece(){
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {}

        switch(type){
            case 'I':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'J':
                piece.blocks = [
                    [0, 0, 0],
                    [2, 2, 2],
                    [0, 0, 2]
                ];
                break;
            case 'L':
                piece.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [3, 0, 0]
                ];
                break;
            case 'O':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'S':
                piece.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0]
                ];
                break;
            case 'T':
                piece.blocks = [
                    [0, 0, 0],
                    [6, 6, 6],
                    [0, 6, 0]
                ];
                break;
            case 'Z':
                piece.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7]
                ];
                break;
            default:
                throw new Error('Неизвестный тип фигуры :с'); 
        }
        piece.x = Math.floor((10 - piece.blocks[0].length)/2);//фугура появляется в центре игрового поля
        piece.y = -1;
        return piece;
    }
    movePieceLeft() { // сдвигает фигуру влево
        this.activePiece.x -= 1;

        if (this.isPieceOutOfBounds()) {  //не даёт выйти фигуре из поля
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {// сдивгает фигуру вправо
        this.activePiece.x += 1;

        if (this.isPieceOutOfBounds()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() { //сдвигает фигуру вниз
        this.activePiece.y += 1;

        if (this.isPieceOutOfBounds()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updatePieces();
        }
    }
    rotatePiece() { // поворачивает фигуру
        const blocks = this.activePiece.blocks;
        const length = blocks.length;

        const temp = [];
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++)
                temp[x][y] = blocks[length - 1 - y][x];
        }

        this.activePiece.blocks = temp;

        if (this.hasCollision()) {
            this.activePiece.blocks = blocks;
        }
    }
    hasCollision() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] &&
                    ((this.playfild[pieceY + y] === undefined || this.playfild[pieceY + y][pieceX + x] === undefined) ||
                        this.playfild[pieceY + y][pieceX + x])) {
                    return true;
                }
            }
        }

        return false;
    }
    isPieceOutOfBounds() { //метод, который определет положение фигуры в поле
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] && //наличие блока в фигуре
                    ((this.playfild[pieceY + y] === undefined || this.playfild[pieceY + y][pieceX + x] === undefined) ||
                        this.playfild[pieceY + y][pieceX + x])) {
                    return true;
                }
            }
        }

        return false;
    }

    lockPiece() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) { //переберает ряды фигуры
            for (let x = 0; x < blocks[y].length; x++) { // перебирает внутри рядов 
                if (blocks[y][x]) {
                    this.playfild[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
    updatePieces(){
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }
}



