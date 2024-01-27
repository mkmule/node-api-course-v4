import * as dotenv from 'dotenv';
import app from './server';

dotenv.config();

// Error handling (node)
process.on('uncaughtException', () => {
  // do something here
});
process.on('unhandledRejection', () => {
// do something here
});

app.listen(3001, () => {
  console.log('server started on http://localhost:3001');
});
