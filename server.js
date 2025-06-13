import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

const DATA_DIR = join(__dirname, 'src', 'data');
const CARDS_FILE = join(DATA_DIR, 'cards.json');
const IMAGES_DIR = join(DATA_DIR, 'images');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Initialize cards.json if it doesn't exist
if (!fs.existsSync(CARDS_FILE)) {
  fs.writeFileSync(CARDS_FILE, '[]', 'utf8');
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/data/images', express.static(join(__dirname, 'src', 'data', 'images')));

// Get all cards
app.get('/api/cards', (req, res) => {
  try {
    const data = fs.readFileSync(CARDS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading cards:', error);
    res.status(500).json({ error: 'Failed to read cards' });
  }
});

// Save cards
app.post('/api/cards', (req, res) => {
  try {
    fs.writeFileSync(CARDS_FILE, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving cards:', error);
    res.status(500).json({ error: 'Failed to save cards' });
  }
});

// Upload image
app.post('/api/upload', (req, res) => {
  try {
    const { image } = req.body;
    const base64Data = image.split(';base64,').pop();
    const fileExtension = image.match(/^data:image\/(\w+);base64,/)[1];
    const fileName = `profile-${Date.now()}.${fileExtension}`;
    const filePath = join(IMAGES_DIR, fileName);

    fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
    res.json({ imagePath: `data/images/${fileName}` });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});