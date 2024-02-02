import clientPromise from '../../utils/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, security } = req.body;
      const client = await clientPromise;
      const db = client.db('Targeted'); // Replace with your actual DB name

      const response = await db.collection('students').updateOne(
        { _id: new ObjectId(id) }, // Convert string id to ObjectId
        { $set: { security: security } }
      );

      res.status(200).json({ message: 'Student updated successfully', response });
    } catch (e) {
      // Error handling for invalid ObjectId
      if (e.message.includes('ObjectId')) {
        return res.status(400).json({ error: 'Invalid ObjectId format' });
      }
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
