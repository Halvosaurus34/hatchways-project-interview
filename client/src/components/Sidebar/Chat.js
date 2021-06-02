import React, { Component } from "react";
import { Box, Icon } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
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
    background: "#3A8DFF",
    color: "white",
    fontSize: ".7rem",
    borderRadius: "20rem",
  },
  hidden: {
    display: "none",
  },
};

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
    const unRead =
      this.props.conversation.userWithUnReadMessages !== otherUser.id &&
      this.props.activeConvo !== otherUser.username
        ? this.props.conversation.unReadMessages
        : "";
    const isHidden =
      this.props.conversation.userWithUnReadMessages === otherUser.id ||
      this.props.activeConvo === otherUser.username ||
      this.props.conversation.unReadMessages === 0
        ? "none"
        : "";
    if (this.props.activeConvo === otherUser.username) {
      this.handleReadReset(this.props.conversation);
    }
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={this.props.conversation}
          unRead={
            this.props.conversation.userWithUnReadMessages !== otherUser.id &&
            this.props.activeConvo !== otherUser.username &&
            this.props.conversation.unReadMessages !== 0
          }
        />
        <Box>
          <Icon
            variant="contained"
            size="small"
            className={classes.unReadIcon}
            style={{ display: `${isHidden}` }}
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
