const schedule = require("node-schedule");
const moment = require("moment-timezone");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "autosend",
  version: "6.0.0",
  hasPermssion: 0,
  credits: "𝐌.𝐑 𝐀𝐑𝐘𝐀𝐍 (fixed by ChatGPT)",
  description: "Auto message every 1 hour with time & photo",
  commandCategory: "system",
  usages: "automatic",
  cooldowns: 0
};

/* ================= TIME FUNCTION ================= */

const getTimeInfo = () => {
  const now = moment().tz("Asia/Kolkata");
  const hour = Number(now.format("HH"));

  let emoji = "🌙";
  if (hour >= 5 && hour < 12) emoji = "🌅";
  else if (hour >= 12 && hour < 17) emoji = "☀️";
  else if (hour >= 17 && hour < 21) emoji = "🌇";

  return {
    time: now.format("hh:mm A"),
    day: now.format("dddd"),
    month: now.format("MMMM"),
    date: now.format("DD"),
    emoji
  };
};

const createBracket = (info) => `
╔═══════════════════════════════════════════╗
║ 🎀 𝘼𝙍𝙎𝙃< 𝗔𝗨𝗧𝗢 🤖 𝗦𝗘𝗡𝗗 𝗦𝗬𝗦𝗧𝗘𝗠 🎀        ║
╠═══════════════════════════════════════════╣
║    ${info.emoji} Time: ${info.time} ${info.emoji}
║    📅 Date: ${info.date} ${info.month} ${info.day}
║    ⏰ Interval:1 𝗛𝗼𝘂𝗿
╚═══════════════════════════════════════════╝
`;

// Photo folder ka correct path
const photoFolder = path.join(__dirname, "autosend");

const getRandomPhoto = () => {
  console.log(chalk.blue(`📁 Checking photo folder: ${photoFolder}`));
  
  if (!fs.existsSync(photoFolder)) {
    console.log(chalk.yellow(`⚠️ Folder not found, creating: ${photoFolder}`));
    fs.mkdirSync(photoFolder, { recursive: true });
    console.log(chalk.green(`✅ Folder created successfully`));
    return null;
  }

  const files = fs.readdirSync(photoFolder)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|mp4|mov|avi)$/i.test(f));

  console.log(chalk.blue(`📸 Found ${files.length} photos in folder`));
  
  if (!files.length) {
    console.log(chalk.red(`❌ No photos found in ${photoFolder}`));
    console.log(chalk.yellow(`💡 Please add photos to: ${photoFolder}`));
    return null;
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(photoFolder, randomFile);
  console.log(chalk.green(`✅ Selected photo: ${randomFile}`));
  
  return fs.createReadStream(filePath);
};

/* ================= ON LOAD ================= */

let jobStarted = false;

module.exports.onLoad = async ({ api }) => {
  if (jobStarted) return;
  jobStarted = true;

  console.log(chalk.green("✅ AutoSend (1 Hour) Loaded"));
  console.log(chalk.cyan(`📁 Photo folder path: ${photoFolder}`));

  const sendAutoMessage = async () => {
    const info = getTimeInfo();
    const message = createBracket(info);
    const threadIDs = global.data?.allThreadID || [];
    
    console.log(chalk.cyan(`📤 Sending to ${threadIDs.length} threads at ${info.time}`));

    for (const tid of threadIDs) {
      try {
        const photo = getRandomPhoto();
        
        if (photo) {
          console.log(chalk.green(`📷 Sending with photo to ${tid}`));
          await api.sendMessage({
            body: message,
            attachment: photo
          }, tid);
        } else {
          console.log(chalk.yellow(`⚠️ Sending without photo to ${tid}`));
          await api.sendMessage({
            body: message + "\n\n📸 Note: Add photos to autosend folder to get photos!"
          }, tid);
        }
        
        await new Promise(r => setTimeout(r, 500));
      } catch (e) {
        console.log(chalk.red(`❌ Failed to send to ${tid}: ${e.message}`));
      }
    }
  };

  // ⏰ EVERY 1 HOUR (minute 0)
  schedule.scheduleJob("0 * * * *", sendAutoMessage);

  // 🚀 First test after 10 seconds
  setTimeout(sendAutoMessage, 10000);
  
  console.log(chalk.green("⏰ Scheduled: Auto message every 1 hour"));
};

/* ================= MANUAL TEST ================= */

module.exports.run = async ({ api, event }) => {
  const info = getTimeInfo();
  const message = createBracket(info);
  const photo = getRandomPhoto();

  try {
    if (photo) {
      console.log(chalk.green("✅ Test: Sending with photo"));
      await api.sendMessage({
        body: message,
        attachment: photo
      }, event.threadID);
    } else {
      console.log(chalk.yellow("⚠️ Test: No photo found"));
      await api.sendMessage({
        body: message + "\n\n📸 Note: Add photos to autosend folder!"
      }, event.threadID);
    }
  } catch (error) {
    console.log(chalk.red(`❌ Test failed: ${error.message}`));
  }
};

/* ================= FOLDER CHECKER ================= */

module.exports.checkFolder = async ({ api, event }) => {
  const exists = fs.existsSync(photoFolder);
  const files = exists ? fs.readdirSync(photoFolder)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|mp4|mov|avi)$/i.test(f)) : [];
  
  await api.sendMessage({
    body: `📁 Folder Status:\n` +
          `Path: ${photoFolder}\n` +
          `Exists: ${exists ? "✅ Yes" : "❌ No"}\n` +
          `Photos: ${files.length} found\n` +
          `Files: ${files.length ? files.slice(0, 10).join(", ") : "None"}\n` +
          `${files.length > 10 ? `... and ${files.length - 10} more` : ""}`
  }, event.threadID);
};
