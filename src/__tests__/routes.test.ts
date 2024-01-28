import app from '../server';
import request from 'supertest';

describe('GET /', function () {
  it('should respond with Helo', async () => {
      const res = await request(app)
        .get('/');

      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('hello');
    },
  );
});


describe('POST /user', function () {
  it('should respond with json content type', async () => {
      const res = await request(app)
        .post('/user')
        .send({ username: 'my-name', password: 'my-password' })
        .set('Accept', 'application/json');

      expect(res.headers['Content-Type']).toMatch(/json/);
      expect(res.status).toEqual(200);
    },
  );
});
