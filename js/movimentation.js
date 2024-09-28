// import the initial state of the pieces on the board
import { initialSetup, cols, rows } from "./main.js";

// variables
let boardState = [...initialSetup]; // copy the initial setup of the board
let previousHighlightedSquare = null;
let selectedPiece = null;
let selectedSquare = null;
let turn = true;

const whitePieces = ["B", "K", "N", "P", "Q", "R"];
const blackPieces = ["b", "k", "n", "p", "q", "r"];

// get piece at specific position
const getPiece = (col, row) => boardState[row][col];

function getSquareElement(col, row) {
    return document.querySelector(`[name="${cols[col]}${rows[row]}"]`);
}

// visually update the board after a move
function updateVisualBoard(from, to) {
    const fromSquare = getSquareElement(from.col, from.row)
    const toSquare = getSquareElement(to.col, to.row)

    const piece = fromSquare.querySelector(".piece");
    const oldPiece = toSquare.querySelector(".piece");

    // move piece to the new square
    if (piece) {
        if (oldPiece) {
            toSquare.removeChild(oldPiece); // remove the old piece
        }
        toSquare.appendChild(piece); // append the moved piece
        fromSquare.innerHTML = " ";  // clear the original square
    }

}

// highlight selected square
function highlightSelectedSquare(col, row) {
    if (previousHighlightedSquare) {
        previousHighlightedSquare.classList.remove("selected");
    }

    const currentSquare = getSquareElement(col, row);
    currentSquare.classList.add("selected");
    previousHighlightedSquare = currentSquare;
}

// handle click event for each square
function handleSquareInteraction(col, row) {
    const clickedPiece = getPiece(col, row);
    processSelection(clickedPiece, col, row);
}

function processSelection(clickedPiece, col, row) {
    // if a piece is selected and a different square are clicked, try to move
    if (selectedPiece && isDifferentSquare(col, row)) {
        executeMove(selectedSquare, { col, row })
        highlightSelectedSquare(col, row);
    }
    // select the clicked piece if it's not an empty square
    else if (clickedPiece !== " " && isCorrectTurn(clickedPiece)) {
        selectPiece(clickedPiece, col, row);
    }

}

function isDifferentSquare(col, row) {
    return selectedSquare && (selectedSquare.col !== col || selectedSquare.row !== row)
}

function isCorrectTurn(piece) {
    return (turn && whitePieces.includes(piece)) || (!turn && blackPieces.includes(piece));
}

function selectPiece(piece, col, row) {
    selectedPiece = piece;
    selectedSquare = {col, row};
    highlightSelectedSquare(col, row);
}

// move a piece from one position to another
function executeMove(from, to) {
    if (isValidMove()) {
        // update the board state
        boardState[to.row][to.col] = selectedPiece;
        boardState[from.row][from.col] = " ";
        updateVisualBoard(from, to);

        // alternate the turn
        turn = !turn;
        console.log(turn ? "White to move." : "Black to move.");
    }
    clearSelection();
}

// validate if the move is allowed (to be implemented)
function isValidMove() {
    // ...
    return true;
}

// reset selection after move
function clearSelection() {
    selectedPiece = null;
    selectedSquare = null;
}

const squares = document.querySelectorAll(".square");

squares.forEach((e) => {
    e.addEventListener("click", () => {
        const name = e.getAttribute("name");
        const col = cols.indexOf(name[0])
        const row = rows.indexOf(parseInt(name[1]))
        handleSquareInteraction(col, row)
    })
})