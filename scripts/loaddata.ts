// require('dotenv').config()
import { Client } from "pg";
import SpotifyService from '../src/app/spotify/services'

// const config = {
//     user: 'db',
//     host: 'localhost',
//     password: '',
//     database: 'CcD_Podcast',
//     port: '5432'
// }
// const client = new Client(config)

async function main() {
    // await client.connect()

    const callback = async (data) => {
        // await saveEpisodes(data.items);
        console.log(Object.keys(data));
        process.exit();
    };
    const props = {};

    await SpotifyService.iterateEpisodes(callback, props);

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
        // await client.query(sql, values)
    }
}

main()
