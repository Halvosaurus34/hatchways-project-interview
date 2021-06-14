export const addMessageToStore = (state, payload) => {
  const { message, sender, conversation } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      senderId: message.senderId,
      otherUser: sender,
      messages: [message],
      recipientId: message.recipientId,
      unReadMessages: conversation.unReadMessages,
      userWithUnReadMessages: conversation.userWithUnReadMessages,
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  const newStateArray = state.map((convo) => {
    if (
      convo.id === message.conversationId &&
      (convo.otherUser.id === message.recipientId ||
        convo.otherUser.id === message.senderId)
    ) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      if (convoCopy.userWithUnReadMessages !== message.recipientId) {
        convoCopy.unReadMessages = 1;
      } else {
        convoCopy.unReadMessages++;
      }
      convoCopy.userWithUnReadMessages = message.recipientId;
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
  return newStateArray;
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};
export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const setReadMessage = (convo) => {
  const convoCopy = [...convo];
  if (convoCopy[0].unReadMessages !== 0) {
    convoCopy[0].unReadMessages = 0;
  }
  return convoCopy;
};
