const insultEngine = {};
module.exports = insultEngine;

const insultsArray = require('../insults.json');
const random = require('random');

const insultsByRating = {};

insultsArray.forEach(insult =>
{
    if(insult.rating)
    {
        if(!insultsByRating[insult.rating])
        {
            insultsByRating[insult.rating] = [];
        }

        insultsByRating[insult.rating].push(insult);
    }
});

insultEngine.randomInsult = function(insultRating)
{
    let randomInsult;

    if(insultRating && insultsByRating[insultRating] && insultsByRating[insultRating].length)
    {
        let insultNum = random.int(0, insultsByRating[insultRating].length - 1);
        randomInsult = insultsByRating[insultRating][insultNum].insult;
    }
    else
    {
        let insultNum = random.int(0, insultsArray.length - 1);
        randomInsult = insultsArray[insultNum].insult;
    }

    return randomInsult;
};