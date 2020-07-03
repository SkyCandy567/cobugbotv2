const handler = {};
module.exports = handler;

const commands = require("../commands");

const PREFIX = "&";

handler.handle = async function(client, msg)
{
  if(msg.content.includes(client.user.id))
  {
    console.log("Someone is mentioning me");
    try
    {
      await msg.react("🇸");
      await msg.react("🇹");
      await msg.react("🇫");
      await msg.react("🇺");
    }
    catch(e)
    {
      console.log("Failed to react with emoji");
    }
  }
  else if(msg.content.startsWith(PREFIX))
  {
    console.log("Someone is executing a command");
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(!commands[cmd])
    {
      console.log(cmd + " is not a valid command");
    }
    else
    {
      try
      {
        await commands[cmd].execute(client, msg, cmd, args);
      }
      catch(e)
      {
        console.log("Command " + cmd + " failed with error " + e.message);
      }
    }
  }
};

