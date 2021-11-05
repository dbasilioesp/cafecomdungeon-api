require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SpotifyService = require('./src/spotify-service')
const isDev = process.env.NODE_ENV === 'development';

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
    res.json({
        api: 'cafecomdungeon',
        version: '1.0.0',
        env: process.env.NODE_ENV,
    })
})

app.get('/episodes', async (req, res) => {
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
        
        const episodes = await SpotifyService.getEpisodes(accessToken);
        
        res.json(episodes)
    } catch (error) {
        console.error(error)
        res.error(500).json(error)
    }
})

app.listen('3000', () => {
    console.log('Listening on 3000')
})