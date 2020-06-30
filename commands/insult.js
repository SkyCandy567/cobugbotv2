const insults = require('../insults.json');

module.exports = {
  name: 'insult',
  description: 'Insult!',
  async execute(client, msg, cmd, args) {
    console.log("Insulting someone");

    let randomInsult = Math.floor(Math.random() * Math.floor(insults.length));

    console.log("Insulting with insult #" + randomInsult);

    if (msg.deletable) msg.delete();

    if (msg.content.includes("@")) {
      const mention = msg.mentions.users.find(user => user.username);
      msg.channel.send(`${mention} ${insults[randomInsult].insult}`);
    } else {
      msg.reply(`${insults[randomInsult].insult}`);
    }
  }
};
