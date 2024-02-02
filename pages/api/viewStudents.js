// pages/api/viewStudents.js
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // Replace with your DB name

      const students = await db.collection('students').find({}).toArray();

      res.status(200).json(students);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
