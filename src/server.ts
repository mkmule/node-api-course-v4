import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect } from './modules/auth';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', protect, router);

export default app;
