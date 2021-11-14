require('dotenv').config()
import * as express from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import SpotifyService from './src/spotify-service'

const isDev = process.env.NODE_ENV === 'dev';

const app = express()

app.use(cors());
app.use(cookieParser(process.env.SECRET))

const COOKIE_OPTIONS = {
    secure: !isDev, 
    httpOnly: true,
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
    const { limit, offset } = req.query;

    try {
        let accessToken = req.signedCookies['token'];
        
        if (!accessToken) {
            const auth = await SpotifyService.auth()
            accessToken = auth.access_token;
            
            const options = {
                ...COOKIE_OPTIONS,
                maxAge: auth.expires_in,
            };
            res.cookie('token', accessToken, options);
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