const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const myid = "ADMINDISCORDID";
bot.commands = new Discord.Collection();

/* --- import commands from other files --- */

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f=> f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find file");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

/* --- Bot Start Up --- */

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("your orders", {type: "LISTENING"});    
});

/* --- Bot commands --- */

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
        commandfile.run(bot, message, args);
    }         
});

/* --- Bot Greetings --- */

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const rules = member.guild.channels.find(ch => ch.name === 'regeln');
    const welcome = member.guild.channels.find(ch => ch.name === 'wilkommen📌');

    const admin = member.guild.members.find(m=>m.displayName === 'Ξra');

    let sicon = member.guild.iconURL;
    let welcomeEmbed = new Discord.RichEmbed()
        .setColor("#1212ea")
        .setThumbnail(sicon)
        .setAuthor("FOENIX Sports", "https://i.imgur.com/DqN0jFn.png")
        .addField("Wilkommen auf dem Discord!", `Wir sind FOENIX Sports eine Apex Legends fokusierte Community. Bei uns findest du immer Leute zum Casual spielen oder auch Spieler für ein competeives ESL Team. Davor solltest du dir allerdings erstmal die <#${rules.id}> durchlesen.`)
        .addField(" 󠀀󠀀",`• Lasse dir eine Rolle in <#${welcome.id}> zuweisen \n• Joine unserem Forum für Member Rechte http://forum.foenix-sports.de \n• Invite deine Freunde mit https://discord.gg/wMbtNXg`)
        .addField(" 󠀀󠀀","Viel Spaß!")
        .setFooter("Kontaktieren einen @Admin oder @Supporter für zusätzliche hilfe");
    
    try{
        member.send(welcomeEmbed)
      }catch(e){
        admin.send(`<@${member.id}>, ist gejoint. We tried to DM them, but their DMs are locked.`)
      }
    
});

/* --- Bot RoleReact --- */

bot.on('messageReactionAdd', (reaction, member) => {

    console.log('Reaction added; current count:'+ reaction.count + ' from member:' + member+ ' the emoji'+ reaction.emoji.name);
    let guild1 = bot.guilds.get("GUILDID");
    var react_role;
    if(reaction.emoji.name === 'apex') {
        react_role = guild1.roles.find(`name`, 'Apex Member');
        console.log("its apex"+react_role);
    }
    if(reaction.emoji.name === 'esl') {
        react_role = guild1.roles.find(`name`, 'ESL Interesse');
        console.log("its esl"+react_role);
    }

    var test = guild1.members.get(member.id);

    test.addRole(react_role);          
    
});

bot.on('messageReactionRemove', (reaction, member) => {
    console.log('Reaction removed; current count:' +  reaction.count+ ' from member:' + member);
    let guild1 = bot.guilds.get("GUILDID");
    var react_role;
    if(reaction.emoji.name === 'apex') {
        react_role = guild1.roles.find(`name`, 'Apex Member');
        console.log("its apex"+react_role);
    }
    if(reaction.emoji.name === 'esl') {
        react_role = guild1.roles.find(`name`, 'ESL Interesse');
        console.log("its esl"+react_role);
    }

    var test = guild1.members.get(member.id);

    test.removeRole(react_role);
       
});

/* --- Log in --- */

bot.login(botconfig.token);