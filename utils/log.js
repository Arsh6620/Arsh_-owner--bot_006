const chalk = require("chalk");

// Random Royal Color Generator
function randomColor() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    let sub = Math.floor(Math.random() * 256).toString(16);
    color += sub.length === 1 ? "0" + sub : sub;
  }
  return "#" + color;
}

// Main Log
module.exports = (data, option) => {
  const crown = "👑  𓆩𝑨𝑹𝑺𝑯 𝑲𝑰𝑵𝑮𓆪  👑";

  switch (option) {
    case "warn":
      console.log(
        chalk.bold.hex("#ffae00")("⚠ WARNING » ") +
        chalk.hex("#ffffff")(data) +
        "\n" +
        chalk.bold.hex("#ffae00")("━━━━━━━━━━━━━━━━━━━━━━━") +
        "\n" +
        chalk.bold.hex("#ffd700")(crown) +
        "\n" +
        chalk.bold.hex("#ffae00")("━━━━━━━━━━━━━━━━━━━━━━━")
      );
      break;

    case "error":
      console.log(
        chalk.bold.hex("#ff0000")("✖ ERROR » ") +
        chalk.hex("#ffffff")(data) +
        "\n" +
        chalk.bold.hex("#ff0000")("━━━━━━━━━━━━━━━━━━━━━━━") +
        "\n" +
        chalk.bold.hex("#ffd700")(crown) +
        "\n" +
        chalk.bold.hex("#ff0000")("━━━━━━━━━━━━━━━━━━━━━━━")
      );
      break;

    default:
      console.log(
        chalk.bold.hex(randomColor())("✧ LOG » ") +
        chalk.hex("#ffffff")(data) +
        "\n" +
        chalk.bold.hex("#8a2be2")("═══════════════════════") +
        "\n" +
        chalk.bold.hex("#ffd700")(crown) +
        "\n" +
        chalk.bold.hex("#8a2be2")("═══════════════════════")
      );
      break;
  }
};

// Loader Style
module.exports.loader = (data, option) => {
  const banner = `
👑 ╔════════════════════════════╗
   ║      𓆩 𝑨𝑹𝑺𝑯 𝑲𝑰𝑵𝑮 𓆪      ║
👑 ╚════════════════════════════╝
`;

  switch (option) {
    case "warn":
      console.log(
        chalk.bold.hex("#ffd700")(banner) +
        chalk.bold.hex("#ffae00")("⚠ LOADING » ") +
        chalk.hex("#ffffff")(data)
      );
      break;

    case "error":
      console.log(
        chalk.bold.hex("#ffd700")(banner) +
        chalk.bold.hex("#ff0000")("✖ FAILED » ") +
        chalk.hex("#ffffff")(data)
      );
      break;

    default:
      console.log(
        chalk.bold.hex("#ffd700")(banner) +
        chalk.bold.hex("#00ffcc")("✔ SUCCESS » ") +
        chalk.hex("#ffffff")(data)
      );
      break;
  }
};
