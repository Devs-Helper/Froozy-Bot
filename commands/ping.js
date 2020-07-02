module.exports = {
    name: 'ping',
    description: 'Ping ü',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};