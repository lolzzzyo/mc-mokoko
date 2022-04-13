const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const activities = require("../data/activities.json");
const activityAPI = require('../persistence/activityAPI.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Replies with List of Activities (Note: You need to be in a voice channel and works only on desktop)'),
	async execute(interaction) {
        if(!interaction.member.voice.channel) {
            await interaction.reply({content:'You need to be in a voice channel first', components: []});
        }else{
            const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_activity')
					.setPlaceholder('Nothing selected')
					.addOptions(activities),
			);	
		    await interaction.reply({content:"Which activity do you want to play?", components: [row]});
        }
	},
    async executeActivity(interaction, activity){
        if(interaction.member.voice.channel) {
            let Invite = await activityAPI.activityInvite(activity, interaction.member.voice.channel.id);
            let activityname = "";
            for(let i in activities){
                if(activities[i].value === activity){
                    activityname = activities[i].label;
                }
            }
            if(Invite) {
                let channelname = interaction.member.voice.channel.name;
                let text = "Click here to start **"+activityname+"** in *" + channelname + "* (24 hours available):\nhttps://discord.gg/"+Invite.code;
                await interaction.update({content:text, components: []});
            }	
		} else {
			await interaction.update({content:'You need to be in a voice channel first', components: []});
		}

    }
};

