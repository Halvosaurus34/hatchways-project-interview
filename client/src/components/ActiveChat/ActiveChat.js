import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    height: "95vh",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: "1vw",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    height: "50vh",
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "1em",
      color: "grey",
      paddingLeft: "2rem",
      height: "2rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      height: "2rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      height: "2rem",
      marginLeft: ".5rem",
      borderRadius: "2rem",
    },
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Box className={classes.messagesContainer}>
              <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                userId={props.user.id}
              />
            </Box>
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={props.user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
