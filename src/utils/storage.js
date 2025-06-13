const SERVER_URL = 'https://user-card-store.onrender.com:3000';

async function saveCards(cards) {
  try {
    const response = await fetch(`${SERVER_URL}/api/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    });
    if (!response.ok) throw new Error('Failed to save cards');
    return await response.json();
  } catch (error) {
    console.error('Error saving cards:', error);
    throw error;
  }
}

async function getCards() {
  try {
    const response = await fetch(`${SERVER_URL}/api/cards`);
    if (!response.ok) throw new Error('Failed to fetch cards');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

async function uploadImage(imageData) {
  try {
    const response = await fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    });
    if (!response.ok) throw new Error('Failed to upload image');
    const result = await response.json();
    return result.imagePath;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function addCard(cardData) {
  try {
    const cards = await getCards();
    let imagePath = null;
    
    if (cardData.image) {
      imagePath = await uploadImage(cardData.image);
    }
    
    const newCard = {
      ...cardData,
      id: Date.now().toString(),
      image: imagePath || cardData.image,
    };
    
    cards.push(newCard);
    await saveCards(cards);
    return newCard;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}

async function updateCard(id, cardData) {
  try {
    const cards = await getCards();
    const index = cards.findIndex(card => card.id === id);
    
    if (index === -1) throw new Error('Card not found');
    
    let imagePath = cardData.image;
    if (cardData.image && cardData.image.startsWith('data:image')) {
      imagePath = await uploadImage(cardData.image);
    }
    
    const updatedCard = {
      ...cards[index],
      ...cardData,
      id,
      image: imagePath,
    };
    
    cards[index] = updatedCard;
    await saveCards(cards);
    return updatedCard;
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
}

async function deleteCard(id) {
  try {
    const cards = await getCards();
    const filteredCards = cards.filter(card => card.id !== id);
    await saveCards(filteredCards);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
}

export { getCards, addCard, updateCard, deleteCard };