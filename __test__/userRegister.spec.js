import request from 'supertest';
import app from '../src/app';

describe('User Registration', () => {
  it('returns 200 Ok when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password1',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password1',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });
});
