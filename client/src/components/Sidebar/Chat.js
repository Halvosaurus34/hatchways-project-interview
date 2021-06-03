import React, { Component } from "react";
import { Box, Icon } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";
const styles = (theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unReadIcon: {
    padding: ".2rem .5rem",
    width: "1rem",
    background: theme.palette.primary.main,
    color: "white",
    fontSize: ".7rem",
    borderRadius: "20rem",
  },
  hidden: {
    display: "none",
  },
});

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setRead(this.props.conversation);
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  handleReadReset = async (conversation) => {
    await this.props.setRead(this.props.conversation);
  };
  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const conversation = this.props.conversation;
    const userWithUnReadMessages = conversation.userWithUnReadMessages;
    const unReadMessages = conversation.unReadMessages;
    const activeConversation = this.props.activeConvo;

    const unRead =
      userWithUnReadMessages !== otherUser.id &&
      activeConversation !== otherUser.username
        ? unReadMessages
        : "";

    const isHidden =
      userWithUnReadMessages === otherUser.id ||
      activeConversation === otherUser.username ||
      unReadMessages === 0;

    if (activeConversation === otherUser.username) {
      this.handleReadReset(conversation);
    }

    return (
      <Box
        onClick={() => this.handleClick(conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={conversation}
          unRead={
            userWithUnReadMessages !== otherUser.id &&
            activeConversation !== otherUser.username &&
            unReadMessages !== 0
          }
        />
        <Box>
          <Icon
            variant="contained"
            size="small"
            className={classes.unReadIcon}
            style={{ display: `${isHidden ? "none" : ""}` }}
          >
            {unRead}
          </Icon>
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRead: (conversation) => {
      dispatch(setRead(conversation));
    },
    setActiveChat: (username) => {
      dispatch(setActiveChat(username));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
