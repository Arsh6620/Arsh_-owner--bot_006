const chalk = require("chalk");

// ====== COLOR SYSTEM ======
const royalGold = "#ffd700";
const neonCyan = "#00f5ff";
const neonPink = "#ff00ff";
const royalPurple = "#8a2be2";
const glassWhite = "#ffffff";
const dangerRed = "#ff0033";
const warnOrange = "#ffaa00";
const successGreen = "#00ffcc";

function randomNeon() {
  const colors = [neonCyan, neonPink, royalPurple, "#00ff99"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ====== PREMIUM HEADER ======
function premiumHeader() {
  return (
    chalk.bold.hex(royalPurple)("╔══════════════════════════════════════╗") + "\n" +
    chalk.bold.hex(royalGold)("        👑  𓆩 𝑨𝑹𝑺𝑯 𝑲𝑰𝑵𝑮 𓆪  👑") + "\n" +
    chalk.bold.hex(neonCyan)("        💎  ULTRA PREMIUM EDITION  💎") + "\n" +
    chalk.bold.hex(royalPurple)("╚══════════════════════════════════════╝")
  );
}

// ====== MAIN LOGGER ======
module.exports = (data, option) => {

  switch (option) {

    case "warn":
      console.log(
        premiumHeader() + "\n" +
        chalk.bold.hex(warnOrange)("   ⚠  WARNING KING  ➜  ") +
        chalk.hex(glassWhite)(data) + "\n" +
        chalk.hex(royalGold)("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      );
      break;

    case "error":
      console.log(
        premiumHeader() + "\n" +
        chalk.bold.hex(dangerRed)("   ❌  ERROR KING  ➜  ") +
        chalk.hex(glassWhite)(data) + "\n" +
        chalk.hex(royalGold)("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      );
      break;

    default:
      console.log(
        premiumHeader() + "\n" +
        chalk.bold.hex(randomNeon())("   ✧  ROYAL LOG  ➜  ") +
        chalk.hex(glassWhite)(data) + "\n" +
        chalk.hex(royalGold)("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      );
      break;
  }
};

// ====== LOADER SYSTEM ======
module.exports.loader = (data, option) => {

  const glassFrame =
    chalk.hex(neonPink)("╭──────────────────────────────────────╮") + "\n" +
    chalk.bold.hex(royalGold)("     👑  𓆩♔𓆪 ⚜️ 𓆩𝑨𝑹𝑺𝑯 𝑲𝑰𝑵𝑮𓆪 𝐑𝐎𝐘𝐀𝐋 𝐁𝐎𝐓 ⚜️ 𓆩♔𓆪  👑") + "\n" +
    chalk.hex(neonPink)("╰──────────────────────────────────────╯");

  switch (option) {

    case "warn":
      console.log(
        glassFrame + "\n" +
        chalk.bold.hex(warnOrange)("   ⏳  Preparing Kingdom  ➜  ") +
        chalk.hex(glassWhite)(data)
      );
      break;

    case "error":
      console.log(
        glassFrame + "\n" +
        chalk.bold.hex(dangerRed)("   💀  Kingdom Failure  ➜  ") +
        chalk.hex(glassWhite)(data)
      );
      break;

    default:
      console.log(
        glassFrame + "\n" +
        chalk.bold.hex(successGreen)("   ⚡  Kingdom Activated  ➜  ") +
        chalk.hex(glassWhite)(data)
      );
      break;
  }
};
