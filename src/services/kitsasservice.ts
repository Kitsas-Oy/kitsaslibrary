import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { KitsasConnectionInterface } from '../interfaces';
import { MockKitsasService } from '../moc/mockitsasservice';
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

    const payload = {
      username: options.username || (process && process.env.KITSAS_USERNAME),
      password: options.password || (process && process.env.KITSAS_PASSWORD),
    };

    const config = this.makeConfig(options);
    const URL = '/v1/login';

    try {
      const response = await (options.token
        ? axios.get<Responses.AuthResponse>(URL, config)
        : axios.post<Responses.AuthResponse>(URL, payload, config));
      return new KitsasConnection(
        config.baseURL as string,
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
          throw new Exceptions.NetworkError(
            axiosError.response?.data?.message || axiosError.message
          );
        }
      } else {
        throw error;
      }
    }
  }

  static makeConfig(options: KitsasConnectionOptions): AxiosRequestConfig {
    const baseURL =
      options.url ||
      (process && process.env.KITSAS_URL) ||
      'https://hub.kitsas.fi';

    const agent =
      options.agent || (process && process.env.KITSAS_AGENT) || 'KitsasLibrary';

    const config: AxiosRequestConfig = {
      baseURL: baseURL,
      headers: {
        'User-Agent': agent,
        Authorization: options.token ? `Bearer ${options.token}` : undefined,
      },
    };

    return config;
  }
}
