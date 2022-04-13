const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    getEventById(event_id) {
        return new Promise(res => {
        let fetched = fetch(`https://e767-2a02-a462-8375-1-bd78-ae48-b1e1-1617.ngrok.io/Event/${event_id}`, {
            method: 'GET'
        }).then(response => response.json())
        res(fetched)
        })
    }
}