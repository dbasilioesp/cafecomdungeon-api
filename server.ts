require('dotenv').config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import SpotifyRouter from './src/app/spotify/routes'
import EpisodeRouter from './src/app/episodes/routes';
import { adminJs, adminJsRouter } from './src/admin'

const app = express()

app.use(cors());
app.use(cookieParser(process.env.SECRET))

app.get('/', async (req, res) => {
    res.json({
        api: 'cafecomdungeon',
        version: '1.0.0',
        env: process.env.NODE_ENV,
    })
})

app.use(adminJs.options.rootPath, adminJsRouter)
app.use('/episodes', EpisodeRouter);
app.use('/sporify', SpotifyRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on 3000')
})