import { KitsasConnectionInterface } from '../interfaces';
import { MockKitsasService } from '../moc/mockitsasservice';
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions';

import { KitsasConnection } from './kitsasconnection';

/**
 * KitsasService is a static class for connecting to Kitsas
 *
 * Start by calling KitsasService.connect(options)
 *
 * @example
 * const connection = await KitsasService.connect({
 *  username: 'user',
 *  password: 'password',
 * });
 *
 * @see {@link KitsasConnectionOptions} to see connection options
 * @see {@link KitsasConnectionInterface} interface to continue after connect
 *
 * To get a mock connection:
 *
 * @example
 * const connection = await KitsasService.connect({
 *   username: 'test@kitsas.fi',
 *   password: 'Test+12345',
 *   mock: true,
 * });
 *
 * @remarks
 * In case of two factor authentication, your first connection
 * will throw TFARequiredError with a code (request2fa). Make a new connection with
 * this code as username and the code from the authenticator app as password
 *
 * @example
 * try {
 *     await KitsasService.connect({
 *     username: 'use2fa@kitsas.fi',
 *     password: 'Test+12345',
 *     mock: true,
 *   });
 * } catch (error) {
 *  if (error instanceof TFARequiredError) {
 *    const connection = await KitsasService.connect({
 *     username: error.getRequestKey(),
 *     password: '123456',
 *     mock: true,
 *   });
 *  }
 * }
 *
 */
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

    try {
      options.url =
        options.url ?? process?.env?.KITSAS_URL ?? 'https://api.kitsas.fi';
      options.username = options.username ?? process?.env?.KITSAS_USERNAME;
      options.password = options.password ?? process?.env?.KITSAS_PASSWORD;
      options.agent =
        options.agent ?? process?.env?.KITSAS_AGENT ?? 'KitsasLibrary';
    } catch (error) {
      if (error instanceof ReferenceError) {
        options.url = options.url ?? 'https://api.kitsas.fi';
      } else {
        throw new Error('Unknown error');
      }
    }

    const response = await KitsasConnection.login(options);
    return new KitsasConnection(options, response);
  }
}
