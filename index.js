const fs = require('fs');
const { Client, Collection, Intents  } = require('discord.js');
const { token, guildId } = require('./config.json');
const temp_voice = require('./data/temp_voice.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});


//Loading Commands
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//Loading Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Listening to the voiceStateUpdate event
client.on('voiceStateUpdate', async (oldState, newState) => { 
    if (newState.channel) { // The member connected to a channel.
		client.guilds.cache.get(guildId).voice = newState;
        console.log(`${newState.member.user.tag} connected to ${newState.channel.name}.`);
    } else if (oldState.channel) { // The member disconnected from a channel.
		client.guilds.cache.get(guildId).voice = oldState;
        console.log(`${oldState.member.user.tag} disconnected from ${oldState.channel.name}.`)
    };
});


//Listening to interactions/commands
client.on('interactionCreate', async interaction => {
    //console.log(interaction)
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//listening to selectmenus
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'select_voice_a') {
		temp_voice.from = interaction.values[0];
		await client.commands.get('move').toChannel(interaction, temp_voice.from);
	} else if (interaction.customId === 'select_voice_b'){
		temp_voice.to = interaction.values[0];
		await client.commands.get('move').executeMove(interaction, temp_voice);
	} else if (interaction.customId === 'select_activity'){
		await client.commands.get('activity').executeActivity(interaction, interaction.values[0]);
	}
});


// Login to Discord with your client's token
client.login(token);