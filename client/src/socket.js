import io from "socket.io-client";
import store from "./store";

import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  const id = store.getState().user.id;
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("received-message", ({ message, sender }) => {
    if (id === message.recipientId) {
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
