const ping = {};
module.exports = ping;

ping.execute = async function(client, msg, cmd, args)
{
    if(msg.deletable) msg.delete();
    let sentMsg = await msg.channel.send(`🏓 Pinging....`);
    sentMsg.edit(`🏓 Pong!\n My latency with Discord API is ${Math.round(client.ping)}ms`);
};
