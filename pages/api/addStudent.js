// pages/api/addStudent.js
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // Replace with your DB name

      // Insert the student data into the 'students' collection
      const response = await db.collection('students').insertOne(req.body);

      res.status(200).json({ message: 'Student added successfully', response });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
