import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import Users from '../models/user.model.mjs';
import hashPassword from './hash.mjs';

export const local = passport.use(new BasicStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
        if (err) {
        return done(err);
        }

        password = hashPassword(password);

        if (!user || user.password !== password) {
        return done(null, false);
        }

    return done(null, user);
    });
    })
    );