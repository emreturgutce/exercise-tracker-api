import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import User from '../models/user';
import validator from 'validator';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { username } = req.body;
      try {
        if (!username || !email || !password)
          throw new Error('All fields must be filled');
        if (!validator.isEmail(email)) throw new Error('Email is not valid');
        const user = await new User({
          username,
          email,
          password,
        }).save();
        await (user as any).generateAuthToken();
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await (User as any).findByCredentials(email, password);
        await user.generateAuthToken();
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
