import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  if (!process.env.RIOT_API_KEY) {
    res.status(500).send({ message: "Riot API key missing" });
    return next('router');
  }

  next();
});

export default router;