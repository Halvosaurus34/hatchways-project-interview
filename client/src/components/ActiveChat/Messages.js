import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [messageList, setmessageList] = useState([]);

  useEffect(() => {
    if (messages) {
      setmessageList(messages.slice(0).reverse());
    }
  }, [messages]);
  return (
    <Box>
      {!messageList
        ? setmessageList(messages.slice(0).reverse())
        : messageList.map((message) => {
            const time = moment(message.createdAt).format("h:mm");
            return message.senderId === userId ? (
              <SenderBubble key={message.id} text={message.text} time={time} />
            ) : (
              <OtherUserBubble
                key={message.id}
                text={message.text}
                time={time}
                otherUser={otherUser}
              />
            );
          })}
    </Box>
  );
};

export default Messages;
