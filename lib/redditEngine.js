const redditEngine =
{
    dj:
    {
        idxStart: 1,
        sub: "dadjokes",
        help: "😆 I'll make you laugh with a dad joke"
    },
    st:
    {
        idxStart: 2,
        sub: "showerthoughts",
        help: "🚿 I'll share my best thoughts that come to me when I shower"
    },
    ihi:
    {
        idxStart: 1,
        sub: "tihi",
        help: "😠 I'll send you something I hate, and you'll hate it, too"
    },
    meme:
    {
        idxStart: 2,
        sub: "memes",
        help: "🤪 I'll find a meme for you, whatever that is"
    },
    gif:
    {
        idxStart: 2,
        sub: "gifs",
        help: "🥜 It's pronounced 'jif', I'll give you one"
    },
    til:
    {
        idxStart: 1,
        sub: "todayilearned",
        help:  "🧠 I'll tell you something I learned today"
    },
    alpt:
    {
        idxStart: 2,
        sub: "AbusiveLPT",
        help: "☑️ I'll give you a life pro tip that'll make you feel bad"

    }
};

module.exports = redditEngine;

const snoo = require("snoowrap");
const credentials = require("../credentials");
const insultEngine = require("./insultEngine")

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
        let randomInsult = insultEngine.randomInsult();
        return `**${randomInsult}**`;
    }

    if(!redditEngine[cmd].idx)
        redditEngine[cmd].idx = redditEngine[cmd].idxStart;

    let payload = await r.getSubreddit(redditEngine[cmd].sub).getHot()[redditEngine[cmd].idx];
    redditEngine[cmd].idx = redditEngine[cmd].idx === 25 ? redditEngine[cmd].idxStart : redditEngine[cmd].idx + 1;

    return redditEngine[cmd].formatter(payload);
};

redditEngine.dj.formatter = payload => redditEngine.jokeFormatter(payload);
redditEngine.st.formatter = payload => redditEngine.titleFormatter(payload);
redditEngine.ihi.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.meme.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.gif.formatter = payload => redditEngine.urlFormatter(payload);
redditEngine.til.formatter = payload => redditEngine.titleFormatter(payload);
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
        let randomInsult = insultEngine.randomInsult();
        return `**${randomInsult}**`;
    }
    else
    {
        return `${payload.url}`;
    }
};

redditEngine.help = function(cmd)
{
    if(!redditEngine[cmd].help)
        return "";

    return redditEngine[cmd].help;
}