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
        expires_in: 3600,
      });
    } else if (
      options.username === 'use2fa@kitsas.fi' &&
      options.password === 'Test+12345'
    ) {
      throw new Exceptions.TFARequiredError(
        '2FA:bbd80f65-e433-4c78-b740-c81cd5c195b5:2ac0c7e7'
      );
    } else if (
      options.username ===
        '2FA:bbd80f65-e433-4c78-b740-c81cd5c195b5:2ac0c7e7' &&
      options.password === '123456'
    ) {
      return new MockKitsasConnection({
        access_token: '',
        name: 'Double Dolphin',
        expires_in: 3600,
      });
    } else {
      throw new Exceptions.InvalidCredentialsError();
    }
  }
}
