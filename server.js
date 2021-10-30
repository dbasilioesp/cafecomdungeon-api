require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({
        api: 'cafecomdungeon',
        version: '1.0.0',
        env: process.env.NODE_ENV,
    })
})

app.listen('3000', () => {
    console.log('Listening on 3000')
})