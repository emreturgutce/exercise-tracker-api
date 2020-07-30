import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'colors';
import './config/database';

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

export default app;
