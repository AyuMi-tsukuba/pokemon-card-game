// Utility Functions

/**
 * Fetches card details from the API based on the card ID.
 * @param {number} cardId - The ID of the card.
 * @returns {Promise<Object>} - The card data.
 */
// In fetchCardName
async function fetchCardName(cardId) {
  try {
    let response = await fetch(`http://localhost:3000/card/${cardId}`);
    let data = await response.json();
    console.log(`Fetched card data for ${data.name}:`, data); // Debugging log

    // Update the image URL to point to the GitHub repository
    const imageUrl = `https://raw.githubusercontent.com/AyuMi-tsukuba/pokemon-card-images/main/Images/cards/${data.name}.png`;

    return {
      name: data.name,
      cardType: data.cardType,
      state: data.state,
      monsterHP: data.monsterHP,
      evolvesFrom: data.evolvesFrom,
      cardFunction: data.cardFunction,
      Skill1DMG: data.Skill1DMG,
      Skill1EnergyQty: data.Skill1EnergyQty,
      Skill1EnergyType: data.Skill1EnergyType,
      Skill1Effect: data.Skill1Effect,
      Skill2DMG: data.Skill2DMG,
      Skill2EnergyQty: data.Skill2EnergyQty,
      Skill2EnergyType: data.Skill2EnergyType,
      Skill2Effect: data.Skill2Effect,
      imageUrl: imageUrl, // Use the new GitHub URL
    };
  } catch (error) {
    console.error("Error fetching card data:", error);
    return {
      name: "Error",
      cardType: "",
      state: "",
      monsterHP: "",
      evolvesFrom: "",
      cardFunction: "",
      Skill1DMG: "",
      Skill1EnergyQty: "",
      Skill1EnergyType: "",
      Skill1Effect: "",
      Skill2DMG: "",
      Skill2EnergyQty: "",
      Skill2EnergyType: "",
      Skill2Effect: "",
      imageUrl: "", // Fallback to no image
    };
  }
}

/**
 * Moves all cards back to the deck.
 */
function moveAllCardsToDeck() {
  // Move cards from hand to deck
  while (hand.length > 0) {
    let card = hand.pop();
    card.moveTo(
      positionsConfig.deck.x,
      positionsConfig.deck.y + deck.length * positionsConfig.deck.spacing
    );
    deck.push(card);
  }

  // Move cards from prizes to deck
  while (prizes.length > 0) {
    let card = prizes.pop();
    card.moveTo(
      positionsConfig.deck.x,
      positionsConfig.deck.y + deck.length * positionsConfig.deck.spacing
    );
    deck.push(card);
  }

  // Move cards from fields to deck
  for (let field in fields) {
    if (fields[field]) {
      let card = fields[field];
      card.moveTo(
        positionsConfig.deck.x,
        positionsConfig.deck.y + deck.length * positionsConfig.deck.spacing
      );
      deck.push(card);
      fields[field] = null; // Clear the field
    }
  }

  // Move cards from vs fields to deck
  for (let field in vsFields) {
    if (vsFields[field]) {
      let card = vsFields[field];
      card.moveTo(
        positionsConfig.deck.x,
        positionsConfig.deck.y + deck.length * positionsConfig.deck.spacing
      );
      deck.push(card);
      vsFields[field] = null; // Clear the field
    }
  }

  // Shuffle the deck after all cards are moved back
  shuffleDeck();
}

/**
 * Checks if a card is a Basic Monster.
 * @param {Card} card - The card to check.
 * @returns {boolean} - True if the card is a Basic Monster, false otherwise.
 */
function isBasicMonster(card) {
  return card.cardType === "Monster" && card.state === "Basic";
}

/**
 * Finds the first empty field for placing a card.
 * @param {Object} fields - The fields to check (player or opponent).
 * @returns {string|null} - The name of the first empty field, or null if no fields are empty.
 */
function findEmptyField(fields) {
  for (let field in fields) {
    if (!fields[field]) {
      return field;
    }
  }
  return null;
}

/**
 * Rearranges the opponent's hand after drawing or placing a card.
 */
function rearrangevsHand() {
  vsHand.forEach((card, index) => {
    const xPos =
      positionsConfig.vsHand.startX + index * positionsConfig.vsHand.spacing;
    const yPos = positionsConfig.vsHand.startY;
    card.moveTo(xPos, yPos);
  });
}

/**
 * Gets the card at a specific position on the canvas.
 * @param {number} x - The x-coordinate of the position.
 * @param {number} y - The y-coordinate of the position.
 * @returns {Card|null} - The card at the position, or null if no card is found.
 */
function getCardAtPosition(x, y) {
  // Check player's hand
  for (let card of hand) {
    if (
      x >= card.x &&
      x <= card.x + card.width &&
      y >= card.y &&
      y <= card.y + card.height
    ) {
      return card;
    }
  }

  // Check opponent's hand
  for (let card of vsHand) {
    if (
      x >= card.x &&
      x <= card.x + card.width &&
      y >= card.y &&
      y <= card.y + card.height
    ) {
      return card;
    }
  }

  // Check player's fields
  for (let field in fields) {
    let card = fields[field];
    if (
      card &&
      x >= positionsConfig.fields[field].x &&
      x <= positionsConfig.fields[field].x + card.width &&
      y >= positionsConfig.fields[field].y &&
      y <= positionsConfig.fields[field].y + card.height
    ) {
      return card;
    }
  }

  // Check opponent's fields
  for (let field in vsFields) {
    let card = vsFields[field];
    if (
      card &&
      x >= positionsConfig.vsFields[field].x &&
      x <= positionsConfig.vsFields[field].x + card.width &&
      y >= positionsConfig.vsFields[field].y &&
      y <= positionsConfig.vsFields[field].y + card.height
    ) {
      return card;
    }
  }

  return null;
}

// Keyboard Shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "s") shuffleDeck();
  if (event.key === "d") drawCard();
  if (event.key === "f") drawvsCard();
  if (event.key === "p") placeCard();
  if (event.key === "o") placevsCard();
});
