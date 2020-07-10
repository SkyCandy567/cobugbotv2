const insult = {};
module.exports = insult;

const insultEngine = require("../lib/insultEngine");
const complimentEngine = require("../lib/complimentEngine");

const random = require('random');

insult.execute = async function(client, msg, cmd, args)
{
    console.log("Insulting someone");

    if(msg.deletable) await msg.delete();

    let insultOther = false;
    let insultRating = 0;

    if(args.length && args[0].includes("@"))
    {
        insultOther = true;
        args.shift();
        if(args[0])
        {
            let flamesArg = args.join("");
            do
            {
                if(flamesArg.startsWith("🔥"))
                {
                    insultRating++;
                    flamesArg = flamesArg.substring("🔥".length);
                }
                else
                {
                    flamesArg = '';
                }
            } while(flamesArg && insultRating < 5);
        }
    }
    else if(msg.content.includes("@"))
    {
        insultOther = true;
    }

    // 1 out of 10 chance the insult will backfire on themselves
    if(random.int(1, 10) == 1)
    {
        insultOther = false;
    }

    let randomInsult = insultEngine.randomInsult(insultRating);
    let mention;

    if(insultOther)
        mention = msg.mentions.users.find(user => user.username);

    if(mention)
    {
        // 1 out of 20 chance to send a compliment instead
        if(random.int(1, 20) == 1)
        {
            let randomCompliment = complimentEngine.randomCompliment();
            await msg.channel.send(`${mention} ${randomCompliment}`);
        }
        else
        {
            await msg.channel.send(`${mention} ${randomInsult}`);
        }
    }
    else
    {
        await msg.reply(`${randomInsult}`);
    }
};

insult.help = function(cmd)
{
    return "💩 insult another user; use @ to target a user; try adding 🔥 to increase the burn";
};

