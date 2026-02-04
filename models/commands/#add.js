module.exports.config = {
  name: "add",
  version: "1.0.0",
  hasPermssion: 1, // admin only
  credits: "M.R PRINCE",
  description: "UID se user ko group me add karta hai",
  commandCategory: "group",
  usages: ".add <uid>",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  // UID check
  if (!args[0]) {
    return api.sendMessage(
      "❌ UID daalo\nExample: .add 1000xxxxxxxx",
      threadID,
      messageID
    );
  }

  const uid = args[0];

  try {
    // Admin check
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(
      item => item.id == senderID
    );

    if (!isAdmin) {
      return api.sendMessage(
        "❌ Sirf group admin hi kisi ko add kar sakta hai",
        threadID,
        messageID
      );
    }

    // User add
    await api.addUserToGroup(uid, threadID);

    api.sendMessage(
      `╭─〔 ✅ SUCCESS 〕─╮\n` +
      `User successfully group me add ho gaya 🎉\n` +
      `🆔 UID: ${uid}\n` +
      `╰──────────────╯`,
      threadID
    );

  } catch (err) {
    api.sendMessage(
      "❌ User add nahi ho paya\nHo sakta hai:\n• UID galat ho\n• User private ho\n• Bot admin na ho",
      threadID,
      messageID
    );
  }
};
