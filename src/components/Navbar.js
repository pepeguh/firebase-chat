import { AppBar, IconButton, Toolbar,Typography, Grid, Button } from '@mui/material';
import React, { useContext } from 'react';
import '../../src/App.css'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth)
  return (
    <AppBar color={"secondary"} position="static">
      <Toolbar variant='dense'>
        <Grid container justifyContent={"flex-end"}>
          {user ?
           <Button onClick={() => auth.signOut()} 
           style={{color:"#161a1e", borderColor:"#161a1e", marginRight:"5px"}} variant='outlined'>
             Выйти
           </Button>
          :
            <NavLink to={LOGIN_ROUTE}>
              <Button style={{color:"#161a1e", borderColor:"#161a1e", marginRight:"5px"}} variant='outlined'>
                Логин
              </Button>
            </NavLink>
          
        }


        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
