export class KitsasConnectionOptions {
  /**
   * Kitsas API Base URL
   * @default process.env.KITSAS_URL or  https://api.kitsas.fi
   */
  url?: string | undefined = undefined;
  /**
   * User email or userId (for M2M) to login
   *
   * In case on two factor authentication, use the code (beginning with 2FA:) you received
   * In case on passwordless login, use auth key code (beginning with KEY:)
   *
   * @default process.env.KITSAS_USERNAME
   */
  username?: string | undefined = undefined;
  /**
   * User password to login
   *
   * In case on two factor authentication, use the code from the authenticator app
   * In case on passwordless login, use last part of the auth key code
   *
   * @default process.env.KITSAS_PASSWORD
   */
  password?: string | undefined = undefined;
  /**
   * User agent to identify the client
   * @default process.env.KITSAS_AGENT or KitsasLibrary
   */
  agent?: string | undefined = undefined;
  /**
   * OAuth2 access token
   */
  token?: string | undefined = undefined;

  /**
   * Use mock implementation (for testing)
   */
  mock?: boolean = false;
}
