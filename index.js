const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token} = require('./config.json');
const cooldowns = new Discord.Collection();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    //set new item in the collection with the key as the command name and the value as the exported value
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready !');
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if  (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Je ne peux pas executé cette commande dans les DM!');
    }

    if (command.args && !args.length) {
        //TODO - Embed
        let reply = `Arguments incorrect pour cette commande`;

        if (command.usage) {
            reply += `\nL'usage de cette commande doit être: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Pas si vite! Encore ${timeLeft.toFixed(1)} secondes!`);
        }
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`Un problème est survenu lors de l'execution de la commande`);
    }

});

client.login(token);