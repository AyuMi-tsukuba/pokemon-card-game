// Game State Management
let currentPlayer = "player"; // 'player' or 'opponent'
let energyPlacedThisTurn = false; // Track if energy has been placed this turn

/**
 * Switch turns between player and opponent.
 */
function switchTurn() {
  currentPlayer = currentPlayer === "player" ? "opponent" : "player";
  energyPlacedThisTurn = false; // Reset energy placement for the new turn
  console.log(`It's now ${currentPlayer}'s turn.`);
}

/**
 * Check if energy can be placed this turn.
 * @returns {boolean} - True if energy can be placed, false otherwise.
 */
function canPlaceEnergy() {
  return !energyPlacedThisTurn;
}

/**
 * Mark that energy has been placed this turn.
 */
function markEnergyPlaced() {
  energyPlacedThisTurn = true;
}
