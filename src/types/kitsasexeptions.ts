export class InvalidCreditentialsError extends Error {
  constructor() {
    super('Invalid creditentials');
  }
}

export class TFARequiredError extends Error {
  constructor() {
    super('2FA required');
  }
}
