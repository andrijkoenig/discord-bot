const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
    let apexname = args[0];
    let apikey = 'pgwoMt8W7jd9EIzc0iDj8UJZRd1HIFTFIZzyp6T7eRI';
    let url = 'https://www.apexlegendsapi.com//api/v1/player?platform=pc&name='+apexname;
    

    var headers = { 
        'Authorization': apikey        
    };
    request.get({ url: url, headers: headers }, function (e, r, body) {
        var data = JSON.parse(body);
        var stats = `Name : ${data.name} \nLevel: ${data.level}\nLegend : ${data.legends[0].name} \nKills: ${data.legends[0].stats[0].kills}`;
        message.channel.send(stats);
    });

   
}

module.exports.help = {
  name: "apexstats"
}