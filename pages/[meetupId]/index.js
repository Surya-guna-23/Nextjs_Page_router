import { Fragment } from 'react/jsx-runtime';
import MeetupDetail from '../../components/meetups/Meetupdetails';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
function MeetupDetails(props){
    return (
        <Fragment>
        <Head>
            <title>{props.meetups.title}</title>
            <meta name="description" content={props.meetups.description} />
        </Head>
        <MeetupDetail 
            image={props.meetups.image}
            title={props.meetups.title} 
            address={props.meetups.address}
            description={props.meetups.description}
        />
        </Fragment>
    );

}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://surya:4L84yGfzr6NaGIj2@cluster0.fopyxwp.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id:1}).toArray()
    return {
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() }
        })),
        fallback: "blocking" // can also be true or 'blocking'
    };

    }
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId; 
    const client = await MongoClient.connect('mongodb+srv://surya:4L84yGfzr6NaGIj2@cluster0.fopyxwp.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();
    return {
        props: {
            meetups: {
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString()
            } 
        }
    }
}  

export default MeetupDetails;