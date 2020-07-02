const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List of all of commands or info about a specific command',
    aliases: ['commands','h'],
    args: false,
    usage: '[command name]',
    guildOnly: false,
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const {commands} = message.client;

        if (!args.length) {
            data.push('Voici une list de toutes mes commandes:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`Vous pouvez utiliser la commande \`${prefix}help [commande]\` pour avoir des infos sur une commande spécifique`);

            return message.author.send(data, {split: true})
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Je vous aie envoyé mes commandes en message privé!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}. \n`, error);
                message.reply('Je crois bien que je ne peux pas te DM! As-tu tes DM bloqué?');
            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Ce n\'est pas une commande valide');
        }

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true});
    },
};