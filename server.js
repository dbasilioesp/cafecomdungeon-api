require('dotenv').config()
const express = require('express')
const cors = require('cors')
const SpotifyService = require('./src/spotify-service')

const app = express()

app.use(cors());

app.get('/', async (req, res) => {
    res.json({
        api: 'cafecomdungeon',
        version: '1.0.0',
        env: process.env.NODE_ENV,
    })
})

app.get('/episodes', async (req, res) => {
    try {
        const auth = await SpotifyService.auth()
        const episodes = await SpotifyService.getEpisodes(auth.access_token);
        
        res.json(episodes)
    } catch (error) {
        console.error(error)
        res.error(500).json(error)
    }
})

app.listen('3000', () => {
    console.log('Listening on 3000')
})