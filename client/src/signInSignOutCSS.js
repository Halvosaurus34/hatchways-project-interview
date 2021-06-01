import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "./assets/bg-img.png";

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
  mainSideBarContainer: {
    backgroundImage: `linear-gradient(to bottom, rgb(58, 141, 255, 0.75), #86B9FF ), url(${backgroundImage})`,
    opacity: "85%",

    backgroundRepeat: "no-repeat",
    backgroundColor: "linear-gradient(#3A8DFF, #86B9FF)",
    backgroundSize: "cover",
    width: "auto",
  },
  chatBubble: {
    maxWidth: "4rem",
    margin: "1rem 7rem",
  },
  sidebarText: {
    color: "white",
    textAlign: "center",
    margin: "2rem",
  },
}));
