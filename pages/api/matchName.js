
import clientPromise from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Targeted'); // Replace with your DB name

      let students = await db.collection('students').find({}).toArray();
      // Convert ObjectId to String
      students = students.map(student => ({
        ...student,
        _id: student._id.toString(),
      }));

      res.status(200).json(students);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
