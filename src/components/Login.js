import { Box, Button, Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '..';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const {auth} = useContext(Context)

  const login = async() => {
    const provider = new GoogleAuthProvider()
    const {user} = await signInWithPopup(auth, provider)
    console.log(user)
  }
  return (
    
     <Container>
      <Grid container
        style={{height:window.innerHeight - 50}}
        alignItems={"center"}
        justifyContent={"center"}
      > 
         <Grid style={{width:400, background:'lightgray'}}
           container
           alignItems={"center"}
           direction={"column"}
           >
            <Box p={5}>
              <Button onClick={login}
               style={{color:"#161a1e", borderColor:"#161a1e"}}>Войти с помощью Google</Button>
            </Box>
         </Grid>

      </Grid>
     </Container>
    
  );
}

export default Login;
