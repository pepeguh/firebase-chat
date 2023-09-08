import { Box, Button, Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '..';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const {auth} = useContext(Context)

  const login = async() => {
    const provider = new GoogleAuthProvider()
    const {user} = await signInWithPopup(auth, provider)
    console.log(user)
  }
  return (
    <div style={{background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(242,235,245,1) 46%, rgba(200,177,220,0.7177844101123596) 100%)'}}>
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

    </div>
    
  );
}

export default Login;
