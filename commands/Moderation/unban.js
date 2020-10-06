module.exports = {
    name: 'unban',
    description: 'Unban a member to the server',
    aliases: ['ub'],
    args: true,
    usage: '<member>',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply(`Je n'ai pas les permissions requise pour ban un utilisateur`);
        }

        const member = message.member;
        if (!member.hasPermission("BAN_MEMBERS")) {
            return message.reply(`Vous n'avez pas les permissions requise pour ban un utilisateur`);
        }

        const searchId = args.slice(0).join(" ");
        if (!searchId) {
            return message.reply(`Veuillez me donner l'id de l'utilisateur à unban`);
        }
        
        message.guild.members.unban(searchId)
        .then(u => {
            message.channel.send(`L'utilisateur a bien été deban`);
        })
        .catch((error) => {
            message.channel.send(`Je n'ai pas pu unban cet utilisateur...`);
        })

    }
}