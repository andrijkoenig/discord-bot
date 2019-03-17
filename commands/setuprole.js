const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    

    let eRole = message.guild.roles.find(`name`, "ESL Interesse");
    let aRole = message.guild.roles.find(`name`, "Apex Member");
    

    let emoji_apex = message.guild.emojis.find('name', "apex");
    let emoji_esl = message.guild.emojis.find('name', "esl");
    
    if (message.author.id === "117663229097934852"){

        message.delete();
        
        var toSend = new Discord.RichEmbed()
        .setColor("#da1404")
        .addField("Rollen verteiler", `Klicke die rolle(n) and die du gerne zugewiesen haben würdest. \n ${emoji_apex} ${aRole} - Für allgemeines Apex Interesse \n ${emoji_esl} ${eRole} - Um Interesse an einem ESL Team zu zeigen`)
        .setFooter("Füge Reaktion dazu um zu joinen, entferne sie um die Gruppe zu verlassen \n -> Wenn es hängt, Doppelklick");

        let reactions = [ emoji_apex, emoji_esl];
        

        message.channel.send(toSend)
            .then(function (message) {
              message.react(emoji_apex)
              message.react(emoji_esl)
              message.pin()
            }).catch(function() {
              console.log("sonmthing went wrong");
             });

        return;
    }
}

module.exports.help = {
  name: "setuprole"
}