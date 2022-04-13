const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const voiceChannels = require("../data/voice_channels.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Move users from Voicechannel A to Voicechannel B'),
		//.setDefaultPermission(false),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_voice_a')
					.setPlaceholder('Nothing selected')
					.addOptions(voiceChannels),
			);	
		await interaction.reply({content:"Which channel you want to move from?", components: [row], ephemeral: true});
	},
	async toChannel(interaction, voice_id){
		let voiceFrom = interaction.guild.channels.cache.get(voice_id);
		let members = voiceFrom.members;
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_voice_b')
					.setPlaceholder('Nothing selected')
					.addOptions(voiceChannels),
			);
		if(members.size === 0){
			await interaction.update({content:"No members in the channel to move!", components: [], ephemeral: true});
		}else{
			await interaction.update({content:"You selected: **"+voiceFrom.name+"**\nWhich channel you want to move to?", components: [row], ephemeral: true});
		}

	},
	async executeMove(interaction, voiceChannels){
		let voiceFrom = interaction.guild.channels.cache.get(voiceChannels.from);
		let voiceTo = interaction.guild.channels.cache.get(voiceChannels.to);
		let members = voiceFrom.members;
		if(members.size === 0){
			await interaction.update({content:"No members in the channel to move!", components: [], ephemeral: true});
		}else if(voiceFrom.id === voiceTo.id){
			await interaction.update({content:"Useless to move to the same channel", components: [], ephemeral: true});
		}else{
			for (const [key, value] of members.entries()) {
				value.voice.setChannel(voiceTo.id);
			}
			await interaction.update({content:"Done, moved **"+ voiceFrom.name+"** to **" +voiceTo.name+"**", components: [], ephemeral: true});

		}
		
	}
};