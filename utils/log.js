const chalk = require("chalk");

// Soft Glass Gradient Colors
const glassPrimary = "#00f5ff";   // Neon Cyan
const glassSecondary = "#ff00ff"; // Neon Pink
const glassAccent = "#ffffff";    // White Glow
const gold = "#ffd700";           // Royal Gold

function randomGlass() {
  const colors = ["#00f5ff", "#ff00ff", "#00ffcc", "#8a2be2"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Main Logger
module.exports = (data, option) => {

  const header = chalk.bold.hex(glassPrimary)("╔══════════════════════════════╗");
  const footer = chalk.bold.hex(glassPrimary)("╚══════════════════════════════╝");
  const title = chalk.bold.hex(gold)("      👑  𓆩𝑨𝑹𝑺𝑯 𝑲𝑰𝑵𝑮𓆪  👑");

  switch (option) {

    case "warn":
      console.log(
        header + "\n" +
        title + "\n" +
        chalk.bold.hex("#ffaa00")("   ⚠ WARNING : ") +
        chalk.hex(glassAccent)(data) + "\n" +
        footer
      );
      break;

    case "error":
      console.log(
        header + "\n" +
        title + "\n" +
        chalk.bold.hex("#ff0033")("   ✖ ERROR : ") +
        chalk.hex(glassAccent)(data) + "\n" +
        footer
      );
      break;

    default:
      console.log(
        header + "\n" +
        title + "\n" +
        chalk.bold.hex(randomGlass())("   ✧ LOG : ") +
        chalk.hex(glassAccent)(data) + "\n" +
        footer
      );
      break;
  }
};

// Glass Loader
module.exports.loader = (data, option) => {

  const glassBox = `
${chalk.hex(glassSecondary)("╭──────────────────────────────╮")}
${chalk.bold.hex(gold)("     💎  ARSH KING GLASS UI  💎")}
${chalk.hex(glassSecondary)("╰──────────────────────────────╯")}
`;

  switch (option) {

    case "warn":
      console.log(
        glassBox +
        chalk.bold.hex("#ffaa00")("   ⏳ Loading Warning → ") +
        chalk.hex(glassAccent)(data)
      );
      break;

    case "error":
      console.log(
        glassBox +
        chalk.bold.hex("#ff0033")("   ❌ Loading Failed → ") +
        chalk.hex(glassAccent)(data)
      );
      break;

    default:
      console.log(
        glassBox +
        chalk.bold.hex("#00ffcc")("   ✅ Loading Success → ") +
        chalk.hex(glassAccent)(data)
      );
      break;
  }
};
