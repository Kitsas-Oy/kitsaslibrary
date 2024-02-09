import test from 'ava';

import {
  InvalidCredentialsError,
  TFARequiredError,
} from '../types/kitsasexeptions';

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
  t.assert(err);
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

test('Mock 2FA connection', async (t) => {
  const options = {
    username: 'use2fa@kitsas.fi',
    password: 'Test+12345',
    mock: true,
  };
  const err = await t.throwsAsync<Error>(async () =>
    KitsasService.connect(options)
  );
  t.assert(err instanceof TFARequiredError);
  const tfa = err as TFARequiredError;
  t.assert(
    tfa.getRequestKey() === '2FA:bbd80f65-e433-4c78-b740-c81cd5c195b5:2ac0c7e7'
  );
});

test('Mock 2FA connection with code', async (t) => {
  const options = {
    username: '2FA:bbd80f65-e433-4c78-b740-c81cd5c195b5:2ac0c7e7',
    password: '123456',
    mock: true,
  };
  const connection = await KitsasService.connect(options);
  t.assert(connection.getName() === 'Double Dolphin');
});
