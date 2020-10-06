const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = (client, message) => {
    let prefix = client.config.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

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
}