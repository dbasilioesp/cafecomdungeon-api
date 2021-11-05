require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SpotifyService = require('./src/spotify-service')
const isDev = process.env.NODE_ENV === 'dev';

const app = express()

app.use(cors());
app.use(cookieParser(process.env.SECRET))

const COOKIE_OPTIONS = {
    secure: !isDev, 
    httpOnly: true,
    sameSite: 'strict',
    signed: true,
}

app.get('/', async (req, res) => {
    console.log(req.query)
    res.json({
        api: 'cafecomdungeon',
        version: '1.0.0',
        env: process.env.NODE_ENV,
    })
})

app.get('/episodes', async (req, res) => {
    const { limit, offset } = req.query;

    try {
        let accessToken = req.signedCookies['token'];
        
        if (!accessToken) {
            const auth = await SpotifyService.auth()
            accessToken = auth.access_token;
            
            res.cookie('token', accessToken, {
                ...COOKIE_OPTIONS,
                maxAge: auth.expires_in,
            })
        } 
        
        const params = { token: accessToken, limit, offset };
        const episodes = await SpotifyService.getEpisodes(params);
        
        res.json(episodes)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})

app.listen('3000', () => {
    console.log('Listening on 3000')
})