import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import LoginSignupSideBar from "./LoginSignupSidebar";
import { signInSignOutCSS } from "./signInSignOutCSS";

const Login = (props) => {
  const history = useHistory();
  const classes = signInSignOutCSS();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            Already have an account?
          </Typography>
          <Button
            onClick={() => history.push("/login")}
            variant="text"
            size="large"
            color="primary"
            className={classes.createAccountButton}
          >
            Login
          </Button>
        </Grid>
        <form onSubmit={handleRegister} className={classes.form}>
          <Grid>
            <Typography variant="h4" className={classes.title}>
              Create an account.
            </Typography>
            <Grid className={classes.formEntry}>
              <FormControl fullWidth={true}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.formEntry}>
              <FormControl fullWidth={true}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.formEntry}>
              <FormControl
                error={!!formErrorMessage.confirmPassword}
                fullWidth={true}
              >
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.formEntry}>
              <FormControl
                error={!!formErrorMessage.confirmPassword}
                fullWidth={true}
              >
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
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
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
