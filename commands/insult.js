const insults = require('../insults.json');
const insultsByRating = {};
insults.forEach(insult => {
  if (insult.rating) {
    if (!insultsByRating[insult.rating]) {
      insultsByRating[insult.rating] = [];
    }

    insultsByRating[insult.rating].push(insult);
  }
});

module.exports = {
  name: 'insult',
  description: 'Insult!',
  async execute(client, msg, cmd, args) {
    console.log("Insulting someone");

    if (msg.deletable) msg.delete();

    let insultOther = false;
    let insultRating = 0;

    if (args.length && args[0].includes("@")) {
      insultOther = true;
      args.shift();
      if (args[0]) {
        let flamesArg = args.join("");
        do {
          if (flamesArg.startsWith("🔥")) {
            insultRating++;
            flamesArg = flamesArg.substring("🔥".length);
          } else {
            flamesArg = '';
          }
        } while (flamesArg && insultRating < 5);
      }
    } else if (msg.content.includes("@")) {
      insultOther = true;
    }

    // 1 out of 20 chance the insult will backfire on themselves
    if (rollDie(20) == 1) {
      insultOther = false;
    }

    let randomInsult;
    if (insultRating && insultsByRating[insultRating] && insultsByRating[insultRating].length) {
      let insultNum = Math.floor(Math.random() * Math.floor(insultsByRating[insultRating].length));
      randomInsult = insultsByRating[insultRating][insultNum].insult;
    } else {
      let insultNum = Math.floor(Math.random() * Math.floor(insults.length));
      randomInsult = insults[randomInsult].insult;
    }

    if (insultOther) {
      const mention = msg.mentions.users.find(user => user.username);
      msg.channel.send(`${mention} ${randomInsult}`);
    } else {
      msg.reply(`${randomInsult}`);
    }
  }
};

function rollDie(sides) {
  return Math.floor(Math.random() * Math.floor(sides)) + 1;
}
