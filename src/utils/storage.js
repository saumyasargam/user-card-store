function saveCards(cards) {
  try {
    localStorage.setItem('cards', JSON.stringify(cards));
    return cards;
  } catch (error) {
    console.error('Error saving cards:', error);
    throw error;
  }
}

function getCards() {
  try {
    const cards = localStorage.getItem('cards');
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

function addCard(cardData) {
  try {
    const cards = getCards();
    const newCard = {
      ...cardData,
      id: Date.now().toString(),
    };
    cards.push(newCard);
    saveCards(cards);
    return newCard;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}

function updateCard(id, cardData) {
  try {
    const cards = getCards();
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) throw new Error('Card not found');
    const updatedCard = {
      ...cards[index],
      ...cardData,
      id,
    };
    cards[index] = updatedCard;
    saveCards(cards);
    return updatedCard;
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
}

function deleteCard(id) {
  try {
    const cards = getCards();
    const filteredCards = cards.filter(card => card.id !== id);
    saveCards(filteredCards);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
}

export { getCards, addCard, updateCard, deleteCard };