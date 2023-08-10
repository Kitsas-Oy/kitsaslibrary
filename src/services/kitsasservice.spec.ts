import test from 'ava';

import { InvalidCredentialsError } from '../types/kitsasexeptions';

import { KitsasService } from './kitsasservice';

test('Incorrect credentials', async (t) => {
  const options = {
    url: 'http://localhost:3000',
    username: 'testi@testi.fi',
    password: 'Ruisräähkä',
  };
  const err = await t.throwsAsync<InvalidCredentialsError>(async () =>
    KitsasService.connect(options)
  );
  t.assert(err instanceof InvalidCredentialsError);
});

test('Correct credentials with mock', async (t) => {
  const options = {
    username: 'test@kitsas.fi',
    password: 'Test+12345',
    mock: true,
  };
  const connection = await KitsasService.connect(options);
  t.assert(connection.getName() === 'Test User');
});
