const ping = require('./ping');
const insult = require('./insult');
const compliment = require('./compliment')
const reddit = require('./reddit');
const help = require('./help');

let commands =
{
    ping: ping,
    insult: insult,
    compliment: compliment,
    dj: reddit,
    st: reddit,
    ihi: reddit,
    meme: reddit,
    gif: reddit,
    til: reddit,
    alpt: reddit,
    help: help
};

module.exports = commands;

help.initialize(commands);
