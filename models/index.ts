import Env from '../env';
import { Sequelize } from 'sequelize';
import InitSummoner from './SummonerModel';

function init(): Sequelize {
    if (!Env.DB_URL) throw new Error('No DB_URL defined!');

    const sequelize = new Sequelize(Env.DB_URL, {
        pool: { max: 10 }
    });

    InitSummoner(sequelize);

    return sequelize;
};

export default { init };