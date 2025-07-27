
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react/jsx-runtime';
function Homepage(props) {
  return(
  <Fragment>
  <Head>
    <title>React Meetups</title>
    <meta name="description" content="Browse a huge list of highly active React meetups!" />
  </Head>  
    <MeetupList meetups={props.meetups}/>
  </Fragment>)
}
export async function getStaticProps() {
  // Here you would typically fetch data from an API or database
  const client = await MongoClient.connect('mongodb+srv://surya:4L84yGfzr6NaGIj2@cluster0.fopyxwp.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    
    props: {
      meetups: meetups.map((meetup)=>({
        title:meetup.title,
        image:meetup.image, 
        address:meetup.address,
        id:meetup._id.toString()
      }))
    },
    revalidate:1
  };
}
export default Homepage;