import { Container, Grid } from "@mui/material";
import React from "react";

const Loader = () => {
    return(
      <div style={{background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(242,235,245,1) 46%, rgba(200,177,220,0.7177844101123596) 100%)'}}>
        <Container>
      <Grid container
        style={{height:window.innerHeight - 50}}
        alignItems={"center"}
        justifyContent={"center"}
      > 
         <Grid 
           container
           alignItems={"center"}
           direction={"column"}
           >
            
            <span className="loader"></span>
         </Grid>
      </Grid>
     </Container>

      </div>
    );
};

export default Loader;