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
