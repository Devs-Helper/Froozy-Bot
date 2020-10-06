module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    aliases: ['a-i'],
    args: true,
    usage: '<arguments>',
    guildOnly: false,
    cooldown: 0,
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Arguments_ ${args}\nArguments lenght: ${args.length}`);
    }
}