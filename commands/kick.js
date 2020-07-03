module.exports = {
    name: 'kick',
    description: 'Kick a member off the server',
    aliases: [],
    args: true,
    usage: '<member> <reason>',
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