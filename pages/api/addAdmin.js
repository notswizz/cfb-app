// pages/api/addAdmin.js
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // The name of your database
      const adminData = req.body;

      // Insert the admin data into the 'globals' collection
      const response = await db.collection('globals').insertOne(adminData);

      res.status(200).json({ message: 'Admin added successfully', data: response });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    // If not a POST request, send 405 - Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
