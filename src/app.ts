import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'colors';
import './config/database';
import RootRoute from './routes/';
import UserRoute from './routes/user';
import passport from './config/passport';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import rateLimit from 'express-rate-limit';
import timeout from 'connect-timeout';

const app = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(timeout('2s'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/', RootRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), UserRoute);
app.use(notFound);
app.use(errorHandler);

export default app;
