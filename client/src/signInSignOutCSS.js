import { makeStyles } from "@material-ui/core/styles";

export const signInSignOutCSS = makeStyles(() => ({
  root: {
    height: "100vh",
  },
  createAccountButtonGroup: {
    margin: "1rem",
  },
  createAccountText: {
    color: "#ccc",
  },
  createAccountButton: {
    height: "3.5rem",
    boxShadow: "0 0  12px 2px rgb(231, 231, 231)",
    margin: "1rem 1.5rem",
    width: "10rem",
  },
  form: {
    width: "65%",
  },
  title: {
    fontWeight: "700",
  },
  formEntry: {
    marginTop: ".5rem",
  },
  submitButton: {
    margin: "2rem auto",
    height: "3.5rem",
    borderRadius: 2,
    width: "40%",
  },
}));
