const Command = require("../../base/Command.js");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Reply pong",
            usage: "ping",
            examples: "ping",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["pong"],
            cooldown: 5,
        });
    }

    run(message) {
        try {
            return message.channel.send({
                embed: {
                    color: 
                }
            })
        }
    }
}

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