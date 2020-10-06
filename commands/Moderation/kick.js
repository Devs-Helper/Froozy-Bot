module.exports = {
    name: 'kick',
    description: 'Kick a member off the server',
    aliases: [],
    args: true,
    usage: '<member> <reason>',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply(`Je n'ai pas les permissions requise pour kick un utilisateur`);
        }

        const member = message.member;
        if (!member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`Vous n'avez pas les permissions requise pour kick un utilisateur`);
        }

        let reason = args.slice(1).join(" ");
        if (!reason) {
            return message.reply(`Veuillez mettre une raison du kick`);
        }

        const user = message.mentions.users.first();
        if (user) {
            const memberKick = message.guild.member(user);
            
            if (memberKick) {
                memberKick
                .kick(reason)
                .then(() => {
                    message.reply(`${user.tag} a bien été kick du serveur`);
                })
                .catch(err => {
                    message.reply('Je ne peux pas kick cet utilisateur');
                    console.error(err);
                });
            } else {
                message.reply('Cet utilisateur n\'est pas sur le serveur');
            }

        } else {
            message.reply('Veuillez mentionner l\'utilisateur à kick');
        }
    },
};