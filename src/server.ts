import express from 'express';
import morgan from 'morgan';

import router from './router';


const app = express();

app.use(morgan('dev'));
app.get('/', async (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', router);

export default app;
