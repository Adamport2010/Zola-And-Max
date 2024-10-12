// Initialize dog and pizza pieces
const puzzlePieces = [
    'zola.png', // Path to your first dog-themed image
    'max.png', // Path to your second dog-themed image
    'pizza1.png', // Path to your first pizza image
    'pizza2.png', // Path to your second pizza image
];

let shuffledPieces = [];

// Function to shuffle the dog and pizza pieces
function shufflePieces() {
    shuffledPieces = [...puzzlePieces];
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
    }
    displayPieces();
}

// Function to display the shuffled dog and pizza pieces
function displayPieces() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = ''; // Clear previous pieces
    shuffledPieces.forEach((piece, index) => {
        const img = document.createElement('img');
        img.src = piece;
        img.alt = `Puzzle piece ${index + 1}`;
        img.className = 'puzzle-piece';
        img.draggable = true;
        img.dataset.index = index;
        img.addEventListener('dragstart', handleDragStart);
        puzzleContainer.appendChild(img);
    });
}

// Drag and drop handlers
let draggedPiece = null;

function handleDragStart(e) {
    draggedPiece = e.target;
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedPiece) {
        const targetIndex = e.target.dataset.index;
        const draggedIndex = draggedPiece.dataset.index;

        // Swap the pieces in the shuffled array
        [shuffledPieces[draggedIndex], shuffledPieces[targetIndex]] = [shuffledPieces[targetIndex], shuffledPieces[draggedIndex]];

        displayPieces();
        checkIfCompleted();
    }
}

function checkIfCompleted() {
    // Check if the pieces are in the correct order
    if (shuffledPieces.join('') === puzzlePieces.join('')) {
        alert('Congratulations! You completed the pizza puzzle with the dogs!');
    }
}

// Function to start the puzzle game
function startPuzzleGame() {
    shufflePieces();
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = ''; // Clear the puzzle container for a new game
    puzzleContainer.addEventListener('dragover', (e) => e.preventDefault());
    puzzleContainer.addEventListener('drop', handleDrop);
}

// Add click event listener to the PNG button
document.getElementById('start-puzzle-button').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    startPuzzleGame();
});
