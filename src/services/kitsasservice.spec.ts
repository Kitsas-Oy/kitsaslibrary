import test from 'ava';

import { InvalidCredentialsError } from '../types/kitsasexeptions';

import { KitsasService } from './kitsasservice';

const mockOptions = {
  username: 'test@kitsas.fi',
  password: 'Test+12345',
  mock: true,
};

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
  const connection = await KitsasService.connect(mockOptions);
  t.assert(connection.getName() === 'Test User');
});

test('Mock connection office list', async (t) => {
  const connection = await KitsasService.connect(mockOptions);
  const offices = await connection.getOffices();
  t.assert(offices.length === 1);
  t.assert(offices[0].name === 'Test Office');
});
