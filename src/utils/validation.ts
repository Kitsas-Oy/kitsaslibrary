/**
 * UUID v4 format validation (RFC 4122)
 * Matches: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where y is 8, 9, a, or b
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

export function validateUuid(value: string, paramName: string): void {
  if (!isValidUuid(value)) {
    throw new Error(`Invalid UUID format for ${paramName}`);
  }
}
