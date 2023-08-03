import test from 'ava';

import { InvalidCreditentialsError } from '../types/kitsasexeptions';

import { KitsasService } from './kitsasservice';

test('Incorrect creditentials', async (t) => {
  const options = {
    url: 'http://localhost:3000',
    email: 'testi@testi.fi',
    password: 'Ruisräähkä',
  };
  const err = await t.throwsAsync<InvalidCreditentialsError>(async () =>
    KitsasService.connect(options)
  );
  t.assert(err instanceof InvalidCreditentialsError);
});
