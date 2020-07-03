const insult = {};
module.exports = insult;

const insultsArray = require('../insults.json');
const complimentsArray = require('../compliments.json');
const random = require('random');

const insultsByRating = {};

insultsArray.forEach(insult =>
{
    if(insult.rating)
    {
        if(!insultsByRating[insult.rating])
        {
            insultsByRating[insult.rating] = [];
        }

        insultsByRating[insult.rating].push(insult);
    }
});

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

    // 1 out of 5 chance the insult will backfire on themselves
    if(random.int(1, 5) == 1)
    {
        insultOther = false;
    }

    let randomInsult = insult.randomInsult(insultRating);

    if(insultOther)
    {
        const mention = msg.mentions.users.find(user => user.username);
        // 1 out of 5 chance to send a compliment instead
        if(random.int(1, 5) == 1)
        {
            let complimentNum = random.int(0, complimentsArray.length - 1);
            await msg.channel.send(`${mention} ${complimentsArray[complimentNum]}`);
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

insult.randomInsult = function(insultRating)
{
    let randomInsult;

    if(insultRating && insultsByRating[insultRating] && insultsByRating[insultRating].length)
    {
        let insultNum = random.int(0, insultsByRating[insultRating].length - 1);
        randomInsult = insultsByRating[insultRating][insultNum].insult;
    }
    else
    {
        let insultNum = random.int(0, insultsArray.length - 1);
        randomInsult = insultsArray[insultNum].insult;
    }

    return randomInsult;
};
