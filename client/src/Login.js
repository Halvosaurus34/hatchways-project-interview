import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import bubble from "./assets/bubble.svg";
import backgroundImage from "./assets/bg-img.png";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container style={{ height: "100vh" }}>
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
      <Grid container item xs={12} sm={7} md={7} lg={7} xl={7} justify="center">
        <Grid
          container
          item
          justify="flex-end"
          alignItems="baseline"
          style={{ margin: "1rem" }}
        >
          <Typography variant="subtitle2" style={{ color: "#ccc" }}>
            Don't have an account?
          </Typography>
          <Button
            onClick={() => history.push("/register")}
            variant="text"
            size="large"
            style={{
              height: "3.5rem",
              boxShadow: "0 0  12px 2px rgb(231, 231, 231)",
              margin: "1rem 1.5rem",
              width: "10rem",
            }}
            color="primary"
          >
            Create account
          </Button>
        </Grid>
        <form onSubmit={handleLogin} style={{ width: "65%" }}>
          <Grid>
            <Typography variant="h4" style={{ fontWeight: "700" }}>
              Welcome back!
            </Typography>

            <Grid style={{ marginTop: "1rem" }}>
              <FormControl margin="normal" fullWidth={true} required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid style={{ marginTop: "1rem" }}>
              <FormControl margin="normal" fullWidth={true} required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid>
              <Box justify="center" style={{ display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{
                    margin: "2rem auto",
                    height: "3.5rem",
                    borderRadius: 2,
                    width: "40%",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
