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
    <div className="relative height-[300px] width-[200px] group bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white/20">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(card)}
          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
          title="Edit"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="p-2 text-red-400 hover:text-red-300 transition-colors"
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
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/20"
          />
        ) : (
          <div className="w-32 h-32 rounded-full mb-4 border-4 border-white/20 bg-gray-700 flex items-center justify-center">
            <FontAwesomeIcon icon="user" className="text-4xl text-gray-400" />
          </div>
        )}
        <h3 className="text-xl font-semibold text-white mb-1">{fullName}</h3>
        <p className="text-blue-300">{position}</p>
      </div>

      <div className="space-x-6 flex justify-center">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-gray-300 hover:text-blue-300 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            {/* <span>{email}</span> */}
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-gray-300 hover:text-blue-300 transition-colors"
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
            className="flex items-center gap-3 text-gray-300 hover:text-blue-300 transition-colors"
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
            className="flex items-center gap-3 text-gray-300 hover:text-blue-300 transition-colors"
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