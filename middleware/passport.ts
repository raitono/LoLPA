import passport from 'passport';
import PassportJwt from 'passport-jwt';
import Env from '../env';
import { User } from '../models/User';

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

var opts: PassportJwt.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Env.JWT_KEY
}
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ where: { email: jwt_payload.data.email } })
        .then(user => {
            if (!user) throw new Error('No user found');

            return User.toIUser(user);
        })
        .then((user) => { return done(null, user) })
        .catch(err => { return done(err, undefined) });
}));

export default passport;