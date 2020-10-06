if (process.version.slice(1).split(".")[0] < 12) {throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");}
const { promisify } = require("util"),
	fs = require("fs"),
	path = require("path"),
	readdir = promisify(fs.readdir);
const Discord = require('discord.js');
const { Client, Collection } = require("discord.js");

class Froozy extends Client {
    constructor(options) {
        super(options);

        // Load config.json
        this.config = require("./config.json");
        // Commands are loaded in collection
        this.commands = new Collection();
        // Aliases are loaded in collections
        this.aliases = new Collection();

        this._launch();
    }

    async _launch() {
        process.setMaxListeners(0);
        this._loadEventsModules();
        this._loadCommandsModules();
        this.login(this.config.token);
    }

    _loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }

            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        }
        catch (error) {
            return `Unable to load command ${commandName}: ${error}`;
        }
    }

    async _loadCommandsModules() {
        const directories = await readdir("./commands/");
        let totalDirectories = 0;
        for (const directory of directories) {
            totalDirectories++;
            const commands = await readdir(`./commands/${directory}/`);
            commands.filter((command) => command.split(".").pop() === "js").forEach((command) => {
                const response = this._loadCommand(`./commands/${directory}`, command);
                if (response) {

                }
            });
        }
        console.log(`[Categories] - Loading ${totalDirectories}/${directories.length} categories.`);
    }

    async _loadEventsModules() {
        const eventFile = await readdir("./events/");
        let totalEvents = 0;
        for (const file of eventsFiles) {
            totalEvents++;
            const eventName = file.split(".")[0];
            const event = new (require(`./events/${file}`));
            this.on(eventName, (...args) => event.run(...args));
            delete require.cache[require.resolve(`./events/${file}`)];
        }
        console.log(`[Events] - Loading ${totalEvents}/${eventFiles.length} event(s).`);
    }
}

const client = new Discord.Client();
client.config = require("./config.json");
// Load events files
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);

    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
}

// Load Commands files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    //set new item in the collection with the key as the command name and the value as the exported value
    client.commands.set(command.name, command);
}

client.login(client.config.token);