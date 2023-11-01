import { KitsasConnectionInterface } from '../interfaces';
import { MockKitsasService } from '../moc/mockitsasservice';
import { KitsasConnectionOptions } from '../types/kitsasconnectionoptions';

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

    if (!options.url) {
      options.url = process?.env?.KITSAS_URL ?? 'https://api.kitsas.fi';
    }
    if (!options.username && process) {
      options.username = process?.env?.KITSAS_USERNAME;
    }
    if (!options.password && process) {
      options.password = process?.env?.KITSAS_PASSWORD;
    }
    if (!options.agent && process) {
      options.agent = process?.env?.KITSAS_AGENT ?? 'KitsasLibrary';
    }

    const response = await KitsasConnection.login(options);
    return new KitsasConnection(options, response);
  }
}
