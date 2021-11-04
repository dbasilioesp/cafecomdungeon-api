require('dotenv').config()
const axios = require('axios')

const clientId = process.env.SPOTIFY_CLIENTID; // Your client id
const secret = process.env.SPOTIFY_SECRET; // Your secret

const SpotifyService = {
    async auth() {
        const url = 'https://accounts.spotify.com/api/token';
        const data = 'grant_type=client_credentials';
        const config = {
            auth: {
                username: clientId,
                password: secret,
            }
        };
        const response = await axios.post(url, data, config)
        
        return response.data;
    },

    async getEpisodes(token) {
        const url = 'https://api.spotify.com/v1/shows/3YawCjn5MStRqifTZaEUUM/episodes?market=BR';
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await axios.get(url, config)

        return response.data;
    }
}

module.exports = SpotifyService;