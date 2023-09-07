import React, { useContext, useState } from 'react';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import { collection, query, orderBy,addDoc  } from 'firebase/firestore';
import Loader from './Loader';
import { serverTimestamp } from 'firebase/firestore';



const Chat = () => {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')

  const messagesCollection = collection(firestore, 'messages');
  const messagesQuery = query(messagesCollection, orderBy('createdAt'));
  const [messages, loading] = useCollection(messagesQuery);  

  const sendMessage = async () => {
    try {
      const docRef = await addDoc(messagesCollection, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
      setValue('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  
    setValue('')

  }
  if (loading){
    return <Loader/>
  }
  const messagesArray = messages.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <Container style={{background:' radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(242,235,245,1) 46%, rgba(200,177,220,1) 100%)'}}>
      <Grid container
        justifyContent={"center"}
        style={{height: window.innerHeight - 50}}>
          <div style={{width:'80%', height:'60vh', border:'3px solid purple',marginTop:"10px", overflowY:'auto', background:' radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(242,235,245,1) 46%, rgba(200,177,220,1) 100%)'}}>
           {messagesArray.map((message) =>(
             <div style={{
             margin:'3px', 
             border:'solid 1px purple',
             padding:"5px",
             marginLeft: user.uid === message.uid ? 'auto':'10px',
             width:'fit-content'
             }} key={message.id}>
              <Grid container>
                  <Avatar style={{marginTop:'2px'}} src={message.photoURL}/>
                  <div style={{marginLeft:'3px',marginTop:'10px'}}>{message.displayName }{ user.uid === message.uid ? ' (Вы)':''}</div>
              </Grid>
              <div>{message.text}</div>
             </div>
            ))}
          </div>
       
          <Grid 
              container
              direction={'column'}
              alignItems={'flex-end'}
              style={{width:'80%'}}
            >
                <TextField
                fullWidth
                maxRows={2}
                 color={"secondary"} variant='outlined'
                 value={value}
                 onChange={e => setValue(e.target.value)}
                />
                
                <Button onClick={sendMessage} color={"secondary"} variant='outlined'>Отправить</Button>

                
            </Grid>
        </Grid>
     
    </Container>
  );
}

export default Chat;
