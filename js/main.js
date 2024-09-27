// creating the board

const chessBoard = document.getElementById("chessBoard")

const initialSetup = [

    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]

]

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

        const cols = ["a", "b", "c", "d", "e", "f", "g", "h"]
        const rows = [8, 7, 6, 5, 4, 3, 2, 1]
        
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
            const piece = document.createElement("img");
            piece.src = `img/${initialSetup[row][col]}.png`;
            piece.classList.add("piece");
            square.appendChild(piece);
        }

        chessBoard.appendChild(square);
    }
}