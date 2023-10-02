import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { KitsasConnectionInterface } from '../interfaces';
import { MockKitsasService } from '../moc/MocKitsasService';
import * as Responses from '../types/authresponse';
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions';
import * as Exceptions from '../types/kitsasexeptions';

import { KitsasConnection } from './kitsasconnection';

export class KitsasService {
  constructor() {
    throw Error('KitsasService is a static class');
  }

  /**
   * Connect to Kitsas
   * @param options Login and connection options
   * @see KitsasConnectionOptions to see all options
   * @returns Connection object
   * @throws InvalidCredentialsError if credentials are invalid
   * @throws TFARequiredError if 2FA is required
   * @throws Error if network or server errors occurs
   *
   */
  static async connect(
    options: KitsasConnectionOptions
  ): Promise<KitsasConnectionInterface> {
    if (options.mock) {
      return MockKitsasService.connect(options);
    }

    const baseURL =
      options.url ||
      (process && process.env.KITSAS_URL) ||
      'https://hub.kitsas.fi';

    const config: AxiosRequestConfig = {
      baseURL: baseURL,
      headers: {
        'User-Agent':
          options.agent ||
          (process && process.env.KITSAS_AGENT) ||
          'KitsasLibrary',
      },
    };

    const payload = {
      username: options.username || process.env.KITSAS_USERNAME,
      password: options.password || process.env.KITSAS_PASSWORD,
    };

    try {
      const response = await axios.post<Responses.AuthResponse>(
        '/v1/login',
        payload,
        config
      );
      return new KitsasConnection(
        baseURL,
        options.agent || process.env.KITSAS_AGENT || 'KitsasLibrary',
        response.data
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<Responses.ErrorResponse>;
        if (axiosError.response?.data?.message === 'Invalid credentials') {
          throw new Exceptions.InvalidCredentialsError();
        } else if (axiosError.response?.data?.message === '2FA required') {
          throw new Exceptions.TFARequiredError();
        } else {
          throw new Error(axiosError.response?.statusText);
        }
      } else {
        throw error;
      }
    }
  }
}
