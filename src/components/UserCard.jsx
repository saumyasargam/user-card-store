import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const SERVER_URL = 'http://localhost:3001';

function getImageUrl(imagePath) {
  if (!imagePath) return '/default-avatar.png';
  if (imagePath.startsWith('data:image')) return imagePath;
  return `${SERVER_URL}/${imagePath}`;
}

function UserCard({ card, onEdit, onDelete }) {
  const {
    fullName,
    position,
    email,
    phone,
    linkedin,
    instagram,
    image,
  } = card;

  return (
    <div className="bg-background-dark dark:bg-background-light rounded-lg p-6 shadow-lg relative group border border-primary/20 hover:border-primary/50 transition-colors">
      <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onEdit(card)}
          className="text-primary hover:text-primary-dark transition-colors cursor-pointer"
          title="Edit"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="text-primary hover:text-red-500 transition-colors cursor-pointer"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        {image ? (
          <img
            src={getImageUrl(image)}
            alt={fullName}
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-primary/50 "
          />
        ) : (
          <div className="w-32 h-32 rounded-full mb-4 border-2 border-primary/50 bg-gray-700 flex items-center justify-center">
            <FontAwesomeIcon icon="user" className="text-4xl text-gray-400 " />
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2 text-text-dark dark:text-text-light">{fullName}</h2>
        <p className="text-primary dark:text-primary-light mb-4">{position}</p>
      </div>

      <div className="space-x-6 flex justify-center">
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-gray-300 hover:text-primary-dark transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            {/* <span>{email}</span> */}
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-gray-300 hover:text-primary-dark transition-colors"
          >
            <FontAwesomeIcon icon={faPhone} />
            {/* <span>{phone}</span> */}
          </a>
        )}

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-300 hover:text-primary-dark transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            {/* <span>LinkedIn</span> */}
          </a>
        )}

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-300 hover:text-primary-dark transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} />
            {/* <span>Instagram</span> */}
          </a>
        )}
      </div>
    </div>
  );
}

export default UserCard;