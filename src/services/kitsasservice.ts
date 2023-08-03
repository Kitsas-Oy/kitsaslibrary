import { create } from 'apisauce';

import * as Responses from '../types/authresponse';
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions';
import * as Exceptions from '../types/kitsasexeptions';

import { KitsasConnection } from './kitsasconnection';

export class KitsasService {
  private constructor() {
    throw Error('KitsasService is a static class');
  }

  /**
   * Connect to Kitsas
   * @param options Login and connection options
   * @returns Connection object
   * @throws InvalidCreditentialsError if creditentials are invalid
   * @throws TFARequiredError if 2FA is required
   * @throws Error if network or server errors occurs
   *
   */
  static async connect(
    options: KitsasConnectionOptions
  ): Promise<KitsasConnection> {
    const api = create({
      baseURL: options.url || process.env.KITSAS_URL || 'https://hub.kitsas.fi',
      headers: {
        'User-Agent':
          options.agent || process.env.KITSAS_AGENT || 'KitsasLibrary',
      },
    });

    const payload = {
      username: options.email || process.env.KITSAS_USERNAME,
      password: options.password || process.env.KITSAS_PASSWORD,
    };

    const response = await api.post('/v1/login', payload);

    if (response.ok) {
      const data = response.data as Responses.AuthResponse;

      return new KitsasConnection(
        api.getBaseURL(),
        options.agent || process.env.KITSAS_AGENT || 'KitsasLibrary',
        data
      );
    } else if (response.problem === 'CLIENT_ERROR') {
      const error = response.data as Responses.ErrorResponse;
      if (error.message === 'Invalid credentials') {
        throw new Exceptions.InvalidCreditentialsError();
      } else if (error.message === '2FA required') {
        throw new Exceptions.TFARequiredError();
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error(response.problem);
    }
  }
}
