export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export class TFARequiredError extends Error {
  constructor() {
    super('2FA required');
  }
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
