import * as dotenv from 'dotenv';
import app from './server';
import config from './config';

dotenv.config();

// Error handling (node)
process.on('uncaughtException', () => {
  // do something here
});
process.on('unhandledRejection', () => {
// do something here
});

app.listen(config.port, () => {
  console.log(`server started on http://localhost:${config.port}`);
});
