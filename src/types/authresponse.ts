export interface AuthResponse {
  access_token: string;
  name: string;
  expires_in: number;
  id: string;
}

export class ErrorResponse {
  message = '';
  error = '';
  statusCode = 0;
}
