// pages/api/viewGlobals.js
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // The name of your database

      // Fetch the data from the 'globals' collection
      const globals = await db.collection('globals').find({}).toArray();

      res.status(200).json(globals);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    // If not a GET request, send 405 - Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
