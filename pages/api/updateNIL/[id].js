// pages/api/updateNIL/[id].js
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    // Extract the ID from the URL
    const { id } = req.query;

    try {
      const objectId = new ObjectId(id); // Convert string ID to ObjectId
      const { students } = req.body; // Array of student IDs (as strings)

      const client = await clientPromise;
      const db = client.db('Targeted');

      // Update the students array for the specified NIL entry
      const response = await db.collection('nil').updateOne(
        { _id: objectId },
        { $set: { students: students } }
      );

      if (response.modifiedCount === 1) {
        res.status(200).json({ message: 'NIL entry updated successfully' });
      } else {
        res.status(404).json({ message: 'NIL entry not found or no changes made' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
