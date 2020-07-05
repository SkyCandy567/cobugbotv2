const complimentEngine = {};
module.exports = complimentEngine;

const complimentsArray = require('../compliments.json');
const random = require('random');

complimentEngine.randomCompliment = function()
{
    let complimentNum = random.int(0, complimentsArray.length - 1);
    return complimentsArray[complimentNum];
};