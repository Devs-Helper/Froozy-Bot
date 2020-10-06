module.exports = class Command {
    constructor(client, {
        name = null,
        description = "No desription provided",
        usage = "No usage provided",
        examples = "No examples provided",
        dirname = false,
        enabled = true,
        guildOnly = false,
        aliases = [],
        cooldown = 5,
        args = true,
    }) {
        const category = (dirname ? dirname.split("/")[parseInt(dirname.split("/").length - 1, 10)] : "Other");
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, cooldown};
        this.help = { name, description, category, usage, examples};
    }
}