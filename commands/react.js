const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let emoji = message.guild.emojis.find('name', "apex");
    message.react(emoji);
}

module.exports.help = {
  name: "react"
}