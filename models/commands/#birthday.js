const axios = require("axios");

module.exports.config = {
  name: "birthday",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "prince taimoor",
  description: "Birthday react with image",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body) return;

  let react = event.body;
  const { threadID, messageID } = event;

  if (
    react.includes("Birthday") ||
    react.includes("BIRTHDAY") ||
    react.includes("BRDY") ||
    react.includes("Brdy") ||
    react.includes("birthday") ||
    react.includes("brdy")
  ) {
    try {
      const imgURL = "https://i.ibb.co/V0k5NnSM/imgbb-1770467779392.gif";

      const msg = {
        body: `🌟𝚝𝚞𝚖 𝚓𝚒𝚢𝚘 💖𝚑𝚊𝚣𝚊𝚊𝚛𝚘𝚗 🤲𝚜𝚊𝚊𝚕

𝚜𝚊𝚊𝚕 🎈𝚔𝚎 𝚍𝚒𝚗 𝚑𝚘𝚗 ❤️𝚙𝚊𝚌𝚑𝚊𝚊𝚜 𝚑𝚊𝚣𝚊𝚊𝚛🎈 ...`,
        attachment: await axios
          .get(imgURL, { responseType: "stream" })
          .then(res => res.data)
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("🎉", messageID, () => {}, true);

    } catch (err) {
      console.log("Image Send Error:", err.message);
    }
  }
};

module.exports.run = function () {};
