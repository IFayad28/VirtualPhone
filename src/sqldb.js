import express from 'express'; // Use import if using ES Modules
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 8000;

// Allow cross-origin requests
app.use(cors());

// MySQL connection setup in an async IIFE
(async () => {
  try {
    // Set up MySQL connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'ContactInfo',
    });
    app.get('/contactInfo', async (req, res) => {
      try {
        const [rows] = await connection.query('SELECT * FROM contacts');
        res.json(rows);
      } catch {
        res.status(500).json({ error: 'Failed to get contact info' });
      }
    });
    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
