require('dotenv').config();

const fs = require("fs");
const Discord = require("discord.js");
const messageHandler = require("./handler");
const client = new Discord.Client({
    disableEveryone: true
});

const TOKEN = process.env.TOKEN;

client.on("ready", async () =>
{
    console.log(`${client.user.tag} is online and ready to hurt your feelings`);

    await client.user.setPresence({
        status: "online",
        game: {
            type: "LISTENING",
            name: "your dumb shit"
        }
    });
});

client.on("message", async (message) =>
{
    try
    {
        await messageHandler.handle(client, message);
    }
    catch(e)
    {
        console.log("Error handling message: " + e.message);
    }
});

client.login(TOKEN);

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGTRAP', 'SIGABRT', 'SIGTERM'].forEach(sig => {
    process.on(sig, function () {
        console.log('Caught signal: ' + sig);
        terminate(sig);
    });
});

function terminate(sig)
{
    console.log("Stopping...");

    (async () => {
        await client.user.setPresence({
            status: "dnd",
            game: {
                type: "WATCHING",
                name: "for when I go offline."
            }
        });

        process.exit();
    })();
}
