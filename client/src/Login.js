import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import LoginSignupSideBar from "./LoginSignupSidebar";
import { signInSignOutCSS } from "./signInSignOutCSS";

const Login = (props) => {
  const history = useHistory();
  const classes = signInSignOutCSS();
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
    <Grid container className={classes.root}>
      <LoginSignupSideBar />
      <Grid container item xs={12} sm={7} md={7} lg={7} xl={7} justify="center">
        <Grid
          container
          item
          justify="flex-end"
          alignItems="baseline"
          className={classes.createAccountButtonGroup}
        >
          <Typography variant="subtitle2" className={classes.createAccountText}>
            Don't have an account?
          </Typography>
          <Button
            onClick={() => history.push("/register")}
            variant="text"
            size="large"
            color="primary"
            className={classes.createAccountButton}
          >
            Create account
          </Button>
        </Grid>
        <form onSubmit={handleLogin} className={classes.form}>
          <Grid>
            <Typography variant="h4" className={classes.title}>
              Welcome back!
            </Typography>

            <Grid className={classes.formEntry}>
              <FormControl margin="normal" fullWidth={true} required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid className={classes.formEntry}>
              <FormControl margin="normal" fullWidth={true} required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid container justify="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={classes.submitButton}
              >
                Login
              </Button>
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
