require('dotenv').config()
import axios from 'axios';

const clientId = process.env.SPOTIFY_CLIENTID; // Your client id
const secret = process.env.SPOTIFY_SECRET; // Your secret

async function auth() {
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
}

async function getEpisodes({ token, limit, offset }) {
    const url = 'https://api.spotify.com/v1/shows/3YawCjn5MStRqifTZaEUUM/episodes';
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: {
            market: 'BR',
            offset,
            limit
        }
    }
    const response = await axios.get(url, config)

    return response.data;
}

async function iterateEpisodes(callback, props) {
    let { offset = 0, limit = 50 } = props;

    while (true) {
        const credentials = await auth()
        const params = { token: credentials.access_token, limit, offset };
        let data = await getEpisodes(params);

        await callback(data);

        if (data.items.length === 0 || data.next === null) {
            break;
        }

        offset += 50;
    }
}

async function loadEpisodes(offset = 0, limit = 50) {
    const collection = [];
    let inOffset = offset

    while (true) {
        console.log("Progress: ", inOffset)
        const credentials = await auth()
        const params = { token: credentials.access_token, limit, offset: inOffset };
        let data = await getEpisodes(params);

        console.log("Items size: ", data.items.length)
        collection.push(data)

        if (data.items.length === 0 || data.next === null) {
            break;
        }

        inOffset += 50;
    }

    return collection;
}

export default {
    auth,
    getEpisodes,
    iterateEpisodes,
    loadEpisodes,
}
