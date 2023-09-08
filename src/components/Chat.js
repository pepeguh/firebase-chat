import React, { useContext, useState, useRef,useEffect  } from 'react';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import { Avatar, Container, Grid } from '@mui/material';
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

  const messagesContainerRef = useRef();//для автопрокрутки


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

  };


  const messagesArray = messages ? messages.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })):[];
 
 
     // useEffect для автопрокрутки до последнего сообщения
  useEffect(() => {
    if (messagesContainerRef.current){
      messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
    } 
    
  }, [messagesArray, messagesContainerRef]); // Зависимость от messagesArray
  if (loading){
    return <Loader/>
  }

  return (
    <div  style={{background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(242,235,245,1) 46%, rgba(200,177,220,0.7177844101123596) 100%)'}}>

    <Container>
      <Grid container
        justifyContent={"center"}
        style={{height: window.innerHeight - 50}}>
          <div 
           style={{
           width:'80%', 
           height:'60vh',
           border:'3px solid purple',
           marginTop:"10px",
           overflowY:'auto'}}
           ref={messagesContainerRef}
           >
           {messagesArray.map((message) =>(
             <div style={{
             margin:'3px', 
             padding:"5px",
             marginLeft: user.uid === message.uid ? 'auto':'10px',
             width:'fit-content',
             
             }} key={message.id}>
              <Grid  container style={{justifyContent:user.uid === message.uid ? 'flex-end': 'flex-start'}}>
                
                <Avatar style={{marginTop:'2px'}} src={message.photoURL}/>
                  <div style={{marginLeft:'10px',marginTop:'14px'}}>{message.displayName }{ user.uid === message.uid ? ' (Вы)':''}</div>
              
                
                  </Grid>
              <div style={{
               marginLeft:'5px',
               marginTop:'4px',
               textAlign: user.uid === message.uid ? 'right' : 'left',
               maxWidth:'600px',
               whiteSpace: 'pre-wrap',
               wordWrap: 'break-word',
                 }}>{message.text}</div>
             </div>
            ))}
          </div>
       
           <Grid 
              container
              direction={'column'}
              alignItems={'flex-end'}
              style={{width:'80%'}}
            > 
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input
                type='text'
               
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    sendMessage();
                    setValue('');
                  }
                }}
                style={{width:'100%',
                 minHeight: '40px',
                 height: '40px',
                 borderRadius: '5px',
                 backgroundColor:'transparent',
                 borderColor:'#5d3954',
                              
                }}
                />
                
                <button
                 onClick={sendMessage}
                 style={{minHeight: '40px',
                 height: '44px',
                 marginLeft:'3px',
                 paddingLeft:'10px',
                 paddingRight:'10px',
                 borderRadius: '5px',
                 backgroundColor:'transparent',
                 borderColor:'#5d3954' ,
                             
                }}
                 >
                 &#x25B6;
                 </button>
            </div>
            </Grid> 

        </Grid>
     
    </Container>
    </div>
  );
}

export default Chat;
