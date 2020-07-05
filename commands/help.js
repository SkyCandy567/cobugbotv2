const help = {};
module.exports = help;

let commandHelp = {};

help.execute = async function(client, msg, cmd, args)
{
    if(msg.deletable) await msg.delete();

    let helpMsg = "";

    Object.keys(commandHelp).forEach(help =>
    {
        helpMsg += help + " - " + commandHelp[help](help) + "\n";
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
    return "help";
};