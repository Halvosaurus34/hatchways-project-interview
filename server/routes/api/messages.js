const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        unReadMessages: 1,
        userWithUnReadMessages: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    if (conversation) {
      conversation.unReadMessages++;
      conversation.userWithUnReadMessages = recipientId;
      await conversation.save();
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender, conversation });
  } catch (error) {
    next(error);
  }
});

router.get("/clearUnRead/:id", async (req, res, next) => {
  try {
    await Conversation.update(
      { unReadMessages: 0 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.sendStatus(200);
  } catch (err) {
    next(error);
  }
});

module.exports = router;
