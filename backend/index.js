const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());

// GET /contacts - fetch contacts from Firestore
app.get('/contacts', async (req, res) => {
  try {
    const snapshot = await db.collection('contacts').get();
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
}); 