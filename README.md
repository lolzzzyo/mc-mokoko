# AVC

Discord bot commands for ABC Server

Required to have node js v12.16.3 and a Discord bot in your application enviroment.

HOW TO RUN:

- setup
    - download node js
    - clone repository in your enviroment
    - add your discord bot token in the "token":"" (example: "token":"12398123JKEKW") in your config.json file in Root folder
    - invite the discord bot in your desired server (with scope: bot and application.commands)
    - change the guild_id, client_id, command_id (might change when running to get the command_id first), board_id and admind_id (if needed, else delete and also delete in events/ready.js) in your config.json file in Root folder
    - change the label and value (channel id) in data/voice_channels.json

- commands
    - open terminal and go to the folder
    - 'npm install' in cmd in the root folder' 
    - 'node deploy-commands.js' in cmd to add the commands in the server
    - 'node .' in cmd to run the bot

- if you followed all these steps, the bot is now running




