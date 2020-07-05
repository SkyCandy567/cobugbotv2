const help = {};
module.exports = help;

const insultEngine = require("../lib/insultEngine");

let commandHelp = {};

help.execute = async function(client, msg, cmd, args)
{
    if(msg.deletable) await msg.delete();

    if(msg.channel.type !== 'dm')
    {
        let author = msg && msg.member;

        let randomInsult = insultEngine.randomInsult();
        await msg.channel.send(`${author} ${randomInsult}`);
        await msg.channel.send(`${author} if you need help, send me a dm with \`&help\` instead.`);
        return;
    }

    let helpMsg = "----------------------------- HELP -----------------------------\n";

    Object.keys(commandHelp).forEach(help =>
    {
        helpMsg += `**&${help}**` + " - ";
        if(commandHelp[help](help))
            helpMsg += `_${commandHelp[help](help)}_`;
        helpMsg += "\n";
    });

    await msg.channel.send(helpMsg);
};

help.initialize = function(commands)
{
    Object.keys(commands).forEach(command =>
    {
        if(commands[command].help)
        {
            commandHelp[command] = commands[command].help;
        }
    });
};

help.help = function(cmd)
{
    return "❓ help";
};