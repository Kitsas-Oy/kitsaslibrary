import test from 'ava';

import { InvalidCredentialsError } from '../types/kitsasexeptions';

import { KitsasService } from './kitsasservice';

test('Incorrect creditentials', async (t) => {
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
