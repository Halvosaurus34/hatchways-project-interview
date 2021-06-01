import React from "react";
import { Grid, Typography } from "@material-ui/core";
import bubble from "./assets/bubble.svg";
import { signInSignOutCSS } from "./signInSignOutCSS";

function LoginSignupSidebar() {
  const classes = signInSignOutCSS();

  return (
    <Grid
      container
      item
      className={classes.mainSideBarContainer}
      sm={5}
      md={5}
      lg={5}
      xl={5}
      alignContent="center"
      justify="center"
    >
      <img src={bubble} alt="chat icon" className={classes.chatBubble} />
      <Typography variant="h4" className={classes.sidebarText}>
        Converse with anyone with any language
      </Typography>
    </Grid>
  );
}

export default LoginSignupSidebar;
