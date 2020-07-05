const ping = require('./ping');
const insult = require('./insult');
const compliment = require('./compliment')
const reddit = require('./reddit');

module.exports = {
    ping: ping,
    insult: insult,
    compliment: compliment,
    dj: reddit,
    st: reddit,
    ihi: reddit,
    meme: reddit,
    gif: reddit,
    til: reddit,
    alpt: reddit
};
