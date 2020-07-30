import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'colors';
import './config/database';
import RootRoute from './routes/';
import UserRoute from './routes/user';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/', RootRoute);
app.use('/users', UserRoute);

export default app;
