import React from "react";
import { Grid, Typography } from "@material-ui/core";
import bubble from "./assets/bubble.svg";
import backgroundImage from "./assets/bg-img.png";

function LoginSignupSidebar() {
  return (
    <Grid
      container
      item
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(58, 141, 255, 0.75), #86B9FF ), url(${backgroundImage})`,
        opacity: "85%",

        backgroundRepeat: "no-repeat",
        backgroundColor: "linear-gradient(#3A8DFF, #86B9FF)",
        backgroundSize: "cover",
        width: "auto",
      }}
      sm={5}
      md={5}
      lg={5}
      xl={5}
      alignContent="center"
      justify="center"
    >
      <img
        src={bubble}
        alt="chat icon"
        style={{ maxWidth: "4rem", margin: "1rem 7rem" }}
      />
      <Typography
        variant="h4"
        style={{ color: "white", textAlign: "center", margin: "2rem" }}
      >
        Converse with anyone with any language
      </Typography>
    </Grid>
  );
}

export default LoginSignupSidebar;
