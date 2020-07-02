module.exports = {
    name: 'reload',
    description: 'Reload a command',
    aliases: [],
    args: true,
    usage: '<command>',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`Il n'existe pas de commande avec le nom ou aliasse \`${commandName}\`, ${message.author}`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`La commande \`${command.name}\` à bien été re-chargée !`);
        } catch (error) {
            console.log(error);
            message.channel.send(`Une erreur s'est passée lors du re-chargement de la commande \`${command.name}\`:\n\`${error.message}\``);
        }

    },
};