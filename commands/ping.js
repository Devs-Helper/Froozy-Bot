module.exports = {
    name: 'ping',
    description: 'Ping',
    aliases: [],
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};