import { KitsasConnectionInterface } from '../interfaces';
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions';
import * as Exceptions from '../types/kitsasexeptions';

import { MockKitsasConnection } from './mockkitsasconnection';

export class MockKitsasService {
  static async connect(
    options: KitsasConnectionOptions
  ): Promise<KitsasConnectionInterface> {
    if (
      options.username === 'test@kitsas.fi' &&
      options.password === 'Test+12345'
    ) {
      return new MockKitsasConnection({
        access_token: '',
        name: 'Test User',
      });
    } else if (
      options.username === 'use2fa@kitsas.fi' &&
      options.password === 'Test+12345'
    ) {
      if (options.code === '123456') {
        return new MockKitsasConnection({
          access_token: '',
          name: 'Double Dolphin',
        });
      } else {
        throw new Exceptions.TFARequiredError();
      }
    } else {
      throw new Exceptions.InvalidCredentialsError();
    }
  }
}
