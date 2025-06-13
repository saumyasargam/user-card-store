import UserCard from './UserCard';

function CardGrid({ cards, onEdit, onDelete }) {
  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No cards yet. Add your first card above!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map(card => (
          <UserCard
            key={card.id}
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;