const redditEngine =
{
    dj:
    {
        idx: 1,
        sub: "dadjokes"
    },
    st:
    {
        idx: 1,
        sub: "showerthoughts"
    },
    ihi:
    {
        idx: 1,
        sub: "tihi"
    },
    meme:
    {
        idx: 1,
        sub: "memes"
    },
    gif:
    {
        idx: 1,
        sub: "gifs"
    },
    til:
    {
        idx: 1,
        sub: "todayilearned"
    },
    alpt:
    {
        idx: 2,
        sub: "AbusiveLPT"
    }
};

module.exports = redditEngine;

const snoo = require("snoowrap");
const credentials = require("../credentials");
const insult = require("../commands/insult")

const r = new snoo({
    userAgent: credentials.userAgent,
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    username: credentials.username,
    password: credentials.password
});

const badUrl1 = "https://v.redd.it";
const badUrl2 = "https://www.reddit.com";

redditEngine.fetcher = async function(cmd)
{
    if(!redditEngine[cmd])
    {
        console.log("Something wrong. Not a reddit command, that's weird...we'll just insult them.");
        let randomInsult = insult.randomInsult();
        return `**${randomInsult}**`;
    }

    let payload = await r.getSubreddit(redditEngine[cmd].sub).getHot()[redditEngine[cmd].idx];
    redditEngine[cmd].idx = redditEngine[cmd].idx === 25 ? 1 : redditEngine[cmd].idx + 1;

    return redditEngine[cmd].formatter(payload);
};

redditEngine.dj.formatter = payload => redditEngine.jokeFormatter(payload);
redditEngine.st.formatter = payload => redditEngine.titleFormatter(payload);
redditEngine.ihi.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.meme.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.gif.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.til.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.alpt.formatter = payload => redditEngine.titleFormatter(payload);

redditEngine.jokeFormatter = function(payload)
{
    return `**${payload.title}** \n_${payload.selftext}_`;
};

redditEngine.titleFormatter = function(payload)
{
    return `**${payload.title}**`;
};

redditEngine.urlFormatter = function(payload)
{
    if(payload.url.includes(badUrl1) || payload.url.includes(badUrl2))
    {
        console.log("Post failed integrity check, insulting instead");
        let randomInsult = insult.randomInsult();
        return `**${randomInsult}**`;
    }
    else
    {
        return `${payload.url}`;
    }
};