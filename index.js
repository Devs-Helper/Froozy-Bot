const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send
    }
});

client.login('NTQzNDg3MTk5MTc0MTk3MjUw.XqbTZA.xHtEXtSWQ4UCtBwb_lRlv4aVfOU');