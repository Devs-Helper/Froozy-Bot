module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Froozy | V2.0');
  }