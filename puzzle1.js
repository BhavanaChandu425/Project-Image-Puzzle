const gameBoard = document.getElementById('game-board');
const boardSize = 3; // 3x3 grid
let tiles = [];
let emptyTileIndex = boardSize * boardSize - 1; // Last tile is the empty one

// Image URL for the puzzle
const imageURL = 'https://images.all-free-download.com/images/graphicthumb/tree_meadow_nature_220408.jpg'; // Replace with your actual image path

// Create the game board
for (let i = 0; i < boardSize * boardSize; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    // Add background image and position for each tile
    tile.style.backgroundImage = `url('${imageURL}')`;
    tile.style.backgroundPosition = `${-(i % boardSize) * 100}px ${-Math.floor(i / boardSize) * 100}px`;

    // Add number overlay
    const numberOverlay = document.createElement('span');
    numberOverlay.textContent = i + 1; // Number each tile
    tile.appendChild(numberOverlay);

    // Add click event for movement
    tile.addEventListener('click', () => moveTile(i));

    gameBoard.appendChild(tile);
    tiles.push(tile);
}

// Mark the empty tile as hidden
tiles[emptyTileIndex].classList.add('hidden-tile');

// Move the tile
function moveTile(index) {
    if (isAdjacent(index, emptyTileIndex)) {
        swapTiles(index, emptyTileIndex);
        emptyTileIndex = index; // Update the empty tile index
        setTimeout(checkWin, 100); // Check for win condition
    }
}

// Check adjacency between tiles
function isAdjacent(index1, index2) {
    const x1 = index1 % boardSize;
    const y1 = Math.floor(index1 / boardSize);
    const x2 = index2 % boardSize;
    const y2 = Math.floor(index2 / boardSize);
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}

// Swap two tiles
function swapTiles(index1, index2) {
    const tempBackground = tiles[index1].style.backgroundPosition;
    const tempTextContent = tiles[index1].querySelector('span').textContent;

    tiles[index1].style.backgroundPosition = tiles[index2].style.backgroundPosition;
    tiles[index1].querySelector('span').textContent = tiles[index2].querySelector('span').textContent;

    tiles[index2].style.backgroundPosition = tempBackground;
    tiles[index2].querySelector('span').textContent = tempTextContent;

    tiles[index1].classList.toggle('hidden-tile');
    tiles[index2].classList.toggle('hidden-tile');
}

// Shuffle tiles initially
(function shuffleTiles() {
    for (let i = 0; i < 200; i++) {
        const adjacent = getAdjacentIndices(emptyTileIndex);
        const randomIndex = adjacent[Math.floor(Math.random() * adjacent.length)];
        swapTiles(randomIndex, emptyTileIndex);
        emptyTileIndex = randomIndex;
    }
})();

// Get indices of adjacent tiles
function getAdjacentIndices(index) {
    const adjacent = [];
    if (index % boardSize > 0) adjacent.push(index - 1); // Left
    if (index % boardSize < boardSize - 1) adjacent.push(index + 1); // Right
    if (index >= boardSize) adjacent.push(index - boardSize); // Above
    if (index < boardSize * (boardSize - 1)) adjacent.push(index + boardSize); // Below
    return adjacent;
}

// Check for winning state
function checkWin() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].querySelector('span').textContent != i + 1) return; // Continue if unsolved
    }
    alert('Congratulations! You solved the puzzle!');
}
