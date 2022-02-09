import { Router } from 'express'
import SpotifyService from './services';

const isDev = process.env.NODE_ENV === 'dev';
const router = Router()
const COOKIE_OPTIONS = {
  secure: !isDev,
  httpOnly: true,
  signed: true,
}

router.get('/episodes', async (req, res) => {
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

export default router;