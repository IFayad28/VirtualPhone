import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'ContactInfo',
    });

    // GET all contacts
    app.get('/', async (req, res) => {
      try {
        const [rows] = await connection.query('SELECT * FROM contacts');
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: 'Failed to get contact info' });
      }
    });

    // POST new contact
    app.post('/addContact', async (req, res) => {
      console.log('✅ /addContact HIT');
      console.log('📦 Incoming data:', req.body);

      try {
        const { first_name, last_name, email, phone_number } = req.body;

        const [rows] = await connection.query(
          `INSERT INTO contacts (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)`,
          [first_name, last_name, email, phone_number]
        );

        res.status(201).json({ message: 'Contact Added Successfully!' });
      } catch (err) {
        console.error('❌ Insert Error:', err); // <- This is what we NEED to see
        res.status(500).json({
          error: 'Failed to Add New Contact',
          details: err.message || JSON.stringify(err),
        });
      }
    });
    app.put('/updateContact/:id', async (req, res) => {
      const { id } = req.params;
      const { first_name, last_name, email, phone_number } = req.body;
      try {
        await connection.query(
          'UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?',
          [first_name, last_name, email, phone_number, id]
        );
        res.json({ message: 'Contact updated successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update contact' });
      }
    });
    app.delete('/deleteContact/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await connection.query('DELETE FROM contacts WHERE id = ?', [id]);
        res.json({ message: 'Contact deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete contact' });
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
