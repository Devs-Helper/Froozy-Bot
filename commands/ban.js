module.exports = {
    name: 'Band',
    description: 'Ban a member off the server',
    aliases: [],
    args: true,
    usage: '<member>',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply(`Je n'ai pas les permissions requise pour ban un utilisateur`);
        }

        const member = message.member;
        if (member.hasPermission("BAN_MEMBERS")) {
            return message.reply(`Vous n'avez pas les permissions requise pour ban un utilisateur`);
        }

        let reaBan = args.slice(1).join(" ");
        if (!reaBan) {
            return message.reply(`Veuillez mettre une raison du Ban`);
        }

        const user = message.mentions.users.first();
        if (user) {
            const memberBan = message.guild.member(user);

            if (memberBan) {
                memberBan
                .ban({
                    reason: reaBan,
                })
                .then(() => {
                    message.reply(`L'utilisateur a bien été banni du serveur`);
                })
                .catch(err => {
                    message.reply(`Je n'ai pas pu bannir cet utilisateur`);
                    console.error(err);
                });
            } else {
                message.reply(`L'utilisateur n'est pas sur le serveur`);
            }
        } else {
            message.reply(`Veuillez mentionner l'utilisateur a bannir`);
        }

    }
}