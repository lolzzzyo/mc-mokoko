const { guildId, moveCommandId, adminId, boardId } = require('../config.json');
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		if (!client.application?.owner) await client.application?.fetch();

		// permission
		
		//to fetch all commands
		//console.log(await client.guilds.cache.get(guildId)?.commands.fetch());

		const command = await client.guilds.cache.get(guildId)?.commands.fetch(moveCommandId);

		const permissions = [
			{
				id: adminId,
				type: 'ROLE',
				permission: true,
			},
			{
				id: boardId,
				type: 'ROLE',
				permission: true,

			}
		];
		
		await command.permissions.add({ permissions });
		console.log('Permissions loaded')
	


		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity("plebs collecting me", {
			type: "WATCHING"
		  });
	},
};