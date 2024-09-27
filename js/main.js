// creating the board

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"]
const rows = [8, 7, 6, 5, 4, 3, 2, 1]

const initialSetup = [

    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]

];

const createChessBoard = () => {

    const chessBoard = document.getElementById("chessBoard");

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");
    
            square.classList.add("square");
            square.setAttribute("name", `${cols[col]}${rows[row]}`);
    
            // alternate colors
            if((row + col) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }
    
            // add pieces
            if (initialSetup[row][col] !== " ") {
                addPieceToSquare(square, initialSetup[row][col]);
            }
    
            chessBoard.appendChild(square);
        }

    }

}

const addPieceToSquare = (square, pieceCode) => {

    const piece = document.createElement("img");

    piece.src = `img/${pieceCode}.png`;
    piece.classList.add("piece");

    const pieceName = getPieceName(pieceCode);
    piece.alt = pieceName;

    const color = pieceCode === pieceCode.toUpperCase() ? "white" : "black";
    piece.setAttribute("data-color", color);

    square.appendChild(piece);

}

const getPieceName = (pieceCode) => {
    const names = {
        "r": "Black Rook", "n": "Black Knight", "b": "Black Bishop",
        "q": "Black Queen", "k": "Black King", "p": "Black Pawn",
        "R": "White Rook", "N": "White Knight", "B": "White Bishop",
        "Q": "White Queen", "K": "White King", "P": "White Pawn"
    };
    return names[pieceCode] || "Unknown Piece";
}

// initialize the function
createChessBoard();