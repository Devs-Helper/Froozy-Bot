const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Display avatar',
    aliases: ['av', 'icon'],
    args: false,
    usage: '[<member>]',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {   
        var looked;
        const toLook = args.join(" ");
        if (!toLook) {
            looked = message.member;
        }
        if (message.mentions.members.size > 0) {
            looked = message.mentions.members.first();
        } else if (toLook) {
            const search = toLook.toLowerCase();
            looked = message.guild.members.cache.filter((member) => member.id === search || member.displayName.toLowerCase().includes(search));
            if (looked.size === 0) return message.channel.send("Aucun utilisateur trouvé");
            else if (looked.size === 1) looked = looked.first();
            else return message.channel.send("Plusieurs utilisateurs ont été trouvés, soyez plus précis.");
        }

        return message.channel.send({ embed: {
            color: 0x0000fa,
            author: {
                name: `Avatar de ${looked.user.username}`,
                icon_url: looked.user.displayAvatarURL({format: "png", dynamic: true}),
            },
            image: {
                url: looked.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}),
            },
            timestamp: new Date(),
            footer: {
                text: "Froozy - Bot"
            }
        }});
    },
};