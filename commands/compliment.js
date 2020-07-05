const compliment = {};
module.exports = compliment;

const insultEngine = require("../lib/insultEngine");
const complimentEngine = require("../lib/complimentEngine");

compliment.execute = async function(client, msg, cmd, args)
{
    console.log("Complimenting someone");

    if(msg.deletable) await msg.delete();

    let author = msg && msg.member && msg.member.id;
    let target;

    if(msg.content.includes("@"))
    {
        // don't allow targeting yourself with a compliment - that's lame
        target = msg.mentions.users.find(user => user.username && user.id !== author);
    }
    else
    {
        // no mention - randomly target
        if(msg.channel.members)
        {
            target = msg.channel.members.filter(member => !member.user.bot).random();
        }
    }

    if(target)
    {
        let randomCompliment = complimentEngine.randomCompliment();
        await msg.channel.send(`${target} ${randomCompliment}`);
    }
    else
    {
        if(msg.member && msg.member.user && msg.member.user.dmChannel)
        {
            await msg.member.user.dmChannel.send("Don't ask me to compliment you. That's lame.");
        }

        let randomInsult = insultEngine.randomInsult();
        await msg.reply(`${randomInsult}`);
    }
};

compliment.help = function(cmd)
{
    return "❤️ compliment another user; use @ to target a user";
};

