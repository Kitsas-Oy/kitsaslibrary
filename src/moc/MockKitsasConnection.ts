import { KitsasConnectionInterface } from '../interfaces';
import { AuthResponse } from '../types/authresponse';

export class MockKitsasConnection implements KitsasConnectionInterface {
  constructor(response: AuthResponse) {
    this.name = response.name;
  }

  getName(): string {
    return this.name;
  }

  private name: string;
}
