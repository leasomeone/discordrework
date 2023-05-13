const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const config = require('./config.js');
const testing = true;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Testing deploy
if (testing) {
	const rest = new REST({ version: '10' }).setToken(testingConfig.token);
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands as testbot!`);

			 const data = await rest.put(
				Routes.applicationGuildCommands(testingConfig.clientId, testingConfig.guildId),
				{ body: commands },
			 );

			console.log(`Successfully reloaded ${data.length} application (/) commands as testbot!`);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
	return;

}
//Prod deploy
else {
	const rest = new REST({ version: '10' }).setToken(config.token);
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands as bot!`);

			 const data = await rest.put(
				Routes.applicationCommands(config.clientId),
				{ body: commands },
			 );

			console.log(`Successfully reloaded ${data.length} application (/) commands as bot!`);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
	return;
}

