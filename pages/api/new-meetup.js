import { MongoClient } from 'mongodb';
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://surya:4L84yGfzr6NaGIj2@cluster0.fopyxwp.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    // Here you would typically save the data to a database
    

    res.status(201).json({ message: 'Meetup created!' });
  }
}
export default handler;