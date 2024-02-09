export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export class TFARequiredError extends Error {
  constructor(requestKey: string) {
    super('2FA required');
    this.requestKey = requestKey;
  }

  public getRequestKey(): string {
    return this.requestKey;
  }

  private requestKey: string;
}

export class RefreshExpiredError extends Error {
  constructor() {
    super('Token expired');
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}
