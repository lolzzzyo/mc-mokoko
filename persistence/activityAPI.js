
const { token } = require("../config.json");
const { Invite } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const applications = {
    "youtube_together": "880218394199220334",
    "fishington": "814288819477020702",
    "chess_in_the_park": "832012774040141894",
    "chess_in_the_park_dev": "832012586023256104",
    "betrayal": "773336526917861400",
    "poker_night": "755827207812677713"
}


module.exports = {
    
    /**
     * Creates Activity Invite in the voice channel
     * @param {string} Application - Application
     * @returns {Invite}
     */
    activityInvite(application, channel) {
        return new Promise(res => {
        let fetched = fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
            method: 'POST',
            body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: applications[application]?applications[application]:application,
            target_type: 2,
            temporary: false,
            validate: null
            }),
            headers: {
            "Authorization": `Bot ${token}`,
            "Content-Type": "application/json"
            }
        }).then(response => response.json())
        res(fetched)
        })
    }
}