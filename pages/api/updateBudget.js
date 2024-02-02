// pages/api/updateBudget.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted');
      const { newBudget } = req.body;

      const response = await db.collection('globals').updateOne(
        { /* query to identify the document to update */ },
        { $set: { nilBudget: newBudget } }
      );

      res.status(200).json({ message: 'Budget updated successfully', response });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
