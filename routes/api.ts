import express from 'express';
import userRouter from './user';
import championRouter from './champion';
import summonerRouter from './summoner';
import dataDragonRouter from './data-dragon';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send('API');
});

router.use('/user', userRouter);
router.use('/champion', championRouter);
router.use('/summoner', summonerRouter);
router.use('/data-dragon', dataDragonRouter);

export default router;
