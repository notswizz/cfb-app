// pages/api/addNIL.js
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // Replace with your DB name

      // Insert the NIL data into the 'nil' collection
      const response = await db.collection('nil').insertOne(req.body);

      res.status(200).json({ message: 'NIL data added successfully', response });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
