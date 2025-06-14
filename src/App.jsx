import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import UserForm from './components/UserForm';
import CardGrid from './components/CardGrid';
import { getCards, addCard, updateCard, deleteCard } from './utils/storage';



function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  const [cards, setCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const loadedCards = await getCards();
      setCards(loadedCards);
      setError(null);
    } catch (err) {
      setError('Failed to load cards');
      console.error('Error loading cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (cardData) => {
    try {
      setLoading(true);
      const newCard = await addCard(cardData);
      setCards(prevCards => [...prevCards, newCard]);
      setError(null);
    } catch (err) {
      setError('Failed to add card');
      console.error('Error adding card:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = async (id, cardData) => {
    try {
      setLoading(true);
      const updatedCard = await updateCard(id, cardData);
      setCards(prevCards =>
        prevCards.map(card => card.id === id ? updatedCard : card)
      );
      setIsOpen(false);
      setEditingCard(null);
      setError(null);
    } catch (err) {
      setError('Failed to update card');
      console.error('Error updating card:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      setLoading(true);
      await deleteCard(id);
      setCards(prevCards => prevCards.filter(card => card.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete card');
      console.error('Error deleting card:', err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (card) => {
    setEditingCard(card);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light p-8 transition-colors">
      {/* <ThemeButton /> */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Class Card System
        </h1>

        {error && (
          <div className="bg-red-500 text-white dark:text-background-light p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <UserForm onSubmit={handleAddCard} />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <CardGrid
            cards={cards}
            onEdit={openEditModal}
            onDelete={handleDeleteCard}
          />
        )}

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-y-auto rounded-2xl bg-background-dark dark:bg-background-light p-6 text-left align-middle shadow-xl transition-all max-h-[90vh]">
              <Dialog.Title className="text-lg font-medium leading-6 text-white mb-4">
                Edit Card
              </Dialog.Title>

              {editingCard && (
                <UserForm
                  initialData={editingCard}
                  onSubmit={(data) => handleUpdateCard(editingCard.id, data)}
                  isEditing
                />
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
