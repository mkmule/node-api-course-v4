import { createNewUser } from '../user';

describe('user handler', () => {
  // Tests will fail after 1st run because we are using same DB.

  it('should create a new user', async () => {
    // Given
    const req = { body: { username: 'user4', password: 'pass' } };
    const res = {
      json: ({ token }) => {
        expect(token).toBeTruthy();
      },
    };
    const next = jest.fn();

    // When
    await createNewUser(req, res, next);

    // Then
    expect(next).not.toHaveBeenCalled();
  });
});
