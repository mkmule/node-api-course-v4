import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';


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

app.post('/user', createNewUser);
app.post('/sign-in', signIn);

app.get('/error', (req, res) => {
  throw new Error('Oh no, it happened!');
});
app.get('/error-sync', (req, res, next) => {
  // Async errors need to be handled manually

  setTimeout(() => {
    next(new Error('Oh no, it happened!'));
  }, 1);
});

app.use((err, req, res, next) => {
  console.log(err);
  // res.status(500);
  res.json({ message: 'oops, there was an error' });
});

export default app;
