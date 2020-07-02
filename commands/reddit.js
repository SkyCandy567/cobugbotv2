const reddit = {};
module.exports = reddit;

//const redditEngine = require("./lib/redditEngine");
//const searchStatus = require("./lib/searchStatus");

reddit.execute = async function(client, msg, cmd, args)
{
    console.log(`Fetching ${cmd}`);
    // TODO: need API access
    console.log("Reddit is disabled for now.");
    return;
    let randomSearch = Math.floor(Math.random() * Math.floor(searchStatus.collection.length));
    if(msg.deletable) msg.delete();

    let sentMessage = await msg.channel.send(searchStatus.collection[randomSearch]);

    payload = await redditEngine.fetcher(cmd);
    sentMessage.edit(payload);
};
