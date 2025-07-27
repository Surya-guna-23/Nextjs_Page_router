import {  useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react/jsx-runtime';
import Head from 'next/head';
function NewmeetupPage() {
  const router = useRouter();
    async function addMeetupHandler(meetupData) {
      
        console.log(meetupData);
        const response=await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {  
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push("/")
        // Here you would typically send the meetupData to your backend server
    }

  return (
  <Fragment>
    <Head>    
      <title>Add New Meetup</title>
      <meta name="description" content="Add your own meetups and create amazing networking opportunities!" />     
    </Head> 
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  </Fragment>
  )
}
export default NewmeetupPage;