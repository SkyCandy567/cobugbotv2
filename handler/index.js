const commands = require("../commands");

const PREFIX = "&";

module.exports = {
  name: 'hander',
  description: 'Message Handler',
  async handle(client, msg) {
    if (msg.content.includes(client.user.id)) {
      console.log("Someone is mentioning me");
      try {
        msg.react("🇸");
        msg.react("🇹");
        msg.react("🇫");
        msg.react("🇺");
      } catch (e) {
        console.log("Failed to react with emoji");
      }
    } else if (msg.content.startsWith(PREFIX)) {
      console.log("Someone is executing a command");
      const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (!commands[cmd]) {
        console.log(cmd + " is not a valid command");
      } else {
        try {
          commands[cmd].execute(client, msg, cmd, args);
        } catch (e) {
          console.log("Command " + cmd + " failed with error " + e.message);
        }
      }
    }
  },
};
