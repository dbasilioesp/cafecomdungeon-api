// require('dotenv').config()
import { Client } from "pg";
import SpotifyService from '../src/spotify-service'

const config = {
    user: 'db',
    host: 'localhost',
    password: '',
    database: 'CcD_Podcast',
    port: '5432'
}
const client = new Client(config)

async function main() {
    await client.connect()
    
    const limit = 50;
    let offset = 0;
    
    while(true) {
        const auth = await SpotifyService.auth()
        const params = { token: auth.access_token, limit, offset };
        let  data = await SpotifyService.getEpisodes(params);
        await saveEpisodes(data.items);

        if(data.items.length === 0 || data.next === null) {
            break;
        }

        offset += 50;
    }
    
    process.exit();
}

async function saveEpisodes(episodes) {
    const fields = '(id, name, description, html_description, audio_preview_url, duration_ms, href, release_date, uri)';
    const sql = `INSERT INTO episodes ${fields} VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    for (const ep of episodes) {
        const values = [
            ep.id,
            ep.name,
            ep.description,
            ep.html_description,
            ep.audio_preview_url,
            ep.duration_ms,
            ep.href,
            ep.release_date,
            ep.uri
        ]
        await client.query(sql, values)
    }
}

main()
