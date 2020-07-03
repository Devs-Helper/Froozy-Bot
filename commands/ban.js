module.exports = {
    name: 'Band',
    description: 'Ban a member off the server',
    aliases: [],
    args: true,
    usage: '<member>',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        const user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        if (user) {
            const member = message.guild.member(user);

            if (member) {
                if (!reason) {
                    return message.reply(`Veuillez mettre une raison`);
                }
                member
                .ban({
                    reason: 'Raison',
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