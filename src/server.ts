import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware example
// app.use((req, res, next) => {
// req['some_secret'] = 'doggy';
// next();

// res.status(401);
// res.json({ message: 'Forbidden' });
// });

app.get('/', async (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', router);

export default app;
