require('dotenv').config();
const schedule = require('node-schedule');
const random = require('random');
const Discord = require("discord.js");
const messageHandler = require("./handler");
const insultEngine = require("./lib/insultEngine");
const redditEngine = require("./lib/redditEngine");
const settings = require("./settings.json");
const client = new Discord.Client({
    disableEveryone: true
});

const TOKEN = process.env.TOKEN;

let botServers = {};

client.on("ready", async () =>
{
    console.log(`${client.user.tag} is online and ready to hurt your feelings`);

    await client.user.setPresence({
        status: "online",
        game: {
            type: "LISTENING",
            name: "your dumb shit &help"
        }
    });

    let guilds = client.guilds.filter(guild => settings.find(setting => setting.serverName === guild.name));

    guilds.forEach(guild => botServers[guild.id] = { name: guild.name, id: guild.id });

    let channels = client.channels.filter(channel => settings.find(setting =>
    {
        return (channel.guild && channel.guild.name === setting.serverName) && (channel.name === setting.primaryBotChannelName);
    })).array();

    channels.forEach(channel => botServers[channel.guild.id].primaryBotChannel = { name: channel.name, id: channel.id, channel: channel });
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

// midnight UTC
schedule.scheduleJob('0 0 * * *', function()
{
    console.log("Scheduling insults to happen 3 times randomly throughout the day");

    let eightHours = 28800000;

    setTimeout(function()
    {
        insultAction();
    }, random.int(1, eightHours));

    setTimeout(function()
    {
        insultAction();
    }, eightHours + random.int(1, eightHours));

    setTimeout(function()
    {
        insultAction();
    }, (2 * eightHours) + random.int(1, eightHours));


    let insultAction = function()
    {
        getBotChannels().forEach(channel =>
        {
            randomlyInsultChannelMember(channel);
        });
    };
});

// 10pm UTC
schedule.scheduleJob('0 22 * * *', function()
{
    console.log("Sending scheduled today I learned.");

    getBotChannels().forEach(channel =>
    {
        sendTodayILearned(channel);
    });
});

function randomlyInsultChannelMember(channel)
{
    (async () =>
    {
        try
        {
            let randomMember = channel.members.filter(member => !member.user.bot).random();
            let randomInsult = insultEngine.randomInsult();
            await channel.send(`${randomMember} ${randomInsult}`);
        }
        catch(e)
        {
            console.log(e.stack);
        }
    })();
}

function sendTodayILearned(channel)
{
    (async () =>
    {
        try
        {
            let msg = await redditEngine.fetcher('til');
            await channel.send(msg);
        }
        catch(e)
        {
            console.log(e.stack);
        }
    })();
}

function getBotChannels()
{
    let channels = [];

    if(botServers)
    {
        Object.keys(botServers).forEach(botServerId =>
        {
            if(botServers[botServerId].primaryBotChannel && botServers[botServerId].primaryBotChannel.channel)
            {
                channels.push(botServers[botServerId].primaryBotChannel.channel);
            }
        });
    }

    return channels;
}

client.login(TOKEN);

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGABRT', 'SIGTERM'].forEach(sig => {
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
                name: "myself lose consciousness."
            }
        });

        process.exit();
    })();
}
