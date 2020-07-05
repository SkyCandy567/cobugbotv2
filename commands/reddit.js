const reddit = {};
module.exports = reddit;

const redditEngine = require("../lib/redditEngine");
const searchStatus = require("../lib/searchStatus");
const random = require('random');

reddit.execute = async function(client, msg, cmd, args)
{
    console.log(`Fetching ${cmd}`);

    let randomSearch = random.int(0, searchStatus.collection.length - 1);
    if(msg.deletable) await msg.delete();

    let sentMessage = await msg.channel.send(searchStatus.collection[randomSearch]);

    let payload = await redditEngine.fetcher(cmd);
    await sentMessage.edit(payload);
};

reddit.help = function(cmd)
{
    return redditEngine.help(cmd);
};