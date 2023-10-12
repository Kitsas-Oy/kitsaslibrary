import axios from 'axios';

import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import { LanguageString } from '../types';
import { BookListItem } from '../types/books';
import { Bookshelf, Office, OfficeRole, OfficeRoleAdd } from '../types/office';
import { UserListItem } from '../types/user';

import { KitsasConnection } from './kitsasconnection';

export class KitsasOffice implements KitsasOfficeInterface {
  constructor(data: Office, connection: KitsasConnection) {
    this.data = data;
    this.connection = connection;
  }

  private data: Office;
  private connection: KitsasConnection;

  getId(): string {
    return this.data.id;
  }

  getName(): string {
    return this.data.name;
  }

  getBusinessId(): string | undefined {
    return this.data.businessId;
  }

  async getBooks(bookshelfId?: string): Promise<BookListItem[]> {
    const { data } = await axios.get<BookListItem[]>(
      '/v1/books?target=' + (bookshelfId ?? this.data.id),
      await this.connection.getConfig()
    );
    return data;
  }

  getRoles(): OfficeRole[] {
    return this.data.roles;
  }

  getBookshelves(): Bookshelf[] {
    return this.data.bookshelves;
  }

  async addRole(name: LanguageString, rights: string[]): Promise<OfficeRole> {
    const payload: OfficeRoleAdd = { name, rights };
    const { data } = await axios.post<OfficeRole>(
      `/v1/roles/${this.data.id}/`,
      payload,
      await this.connection.getConfig()
    );
    this.data.roles.push(data);
    return data;
  }

  async editRole(
    id: string,
    name: LanguageString,
    rights: string[]
  ): Promise<OfficeRole> {
    const payload: OfficeRoleAdd = { name, rights };
    const { data } = await axios.put<OfficeRole>(
      `/v1/roles/${id}`,
      payload,
      await this.connection.getConfig()
    );
    this.data.roles = this.data.roles.map((r) => {
      if (r.id === id) {
        return data;
      }
      return r;
    });
    return data;
  }

  async deleteRole(id: string): Promise<void> {
    await axios.delete(`/v1/roles/${id}`, await this.connection.getConfig());
    this.data.roles = this.data.roles.filter((r) => r.id !== id);
  }

  async getUsers(): Promise<UserListItem[]> {
    const { data } = await axios.get<UserListItem[]>(
      `/v1/users?officeId=${this.data.id}`,
      await this.connection.getConfig()
    );
    return data;
  }
}
