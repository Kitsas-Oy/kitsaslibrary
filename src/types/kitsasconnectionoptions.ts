export class KitsasConnectionOptions {
  /**
   * Kitsas API Base URL
   * @default process.env.KITSAS_URL or  https://api.kitsas.com
   */
  url?: string | undefined = undefined;
  /**
   * User email or userId (for M2M) to login
   * @default process.env.KITSAS_USERNAME
   */
  username?: string | undefined = undefined;
  /**
   * User password to login
   * @default process.env.KITSAS_PASSWORD
   */
  password?: string | undefined = undefined;
  /**
   * User agent to identify the client
   * @default process.env.KITSAS_AGENT or KitsasLibrary
   */
  agent?: string | undefined = undefined;
}