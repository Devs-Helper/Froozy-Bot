module.exports = {
    name: 'purge',
    description: 'Delete a number of message',
    aliases: ['pu', 'delete'],
    args: true,
    usage: '[<number>]',
    guildOnly: true,
    cooldown: 5,
    execute (message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply(`Ce n'est pas un nombre valide`);
        } else if (amount <= 1 || amount > 100) {
            return message.reply("Vous devez donner un nombre entre 1 et 99");
        }

        message.channel.bulkDelete(amount, true)
        .then(messages => {
            message.channel.send(`${messages.size}/${amount-1} messages supprimés !`);
        })
        .catch(err => {
            console.error(err);
            message.channel.send(`Une erreur s'est produit lors de la suppression des messages`);
        });
    }
}