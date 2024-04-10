import axios from 'axios';

import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import { LanguageString } from '../types';
import { BookListItem } from '../types/books';
import {
  CertificateFetchResult,
  CertificateStatusInformation,
} from '../types/certificate';
import {
  Bookshelf,
  Office,
  OfficeContactPerson,
  OfficeCustomization,
  OfficeRole,
  OfficeRoleAdd,
  OfficeType,
} from '../types/office';
import { UserListItem, UserMode } from '../types/user';

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

  getCustomization(): OfficeCustomization | undefined {
    return this.data.customization;
  }

  getContactPersons(): OfficeContactPerson[] {
    return this.data.contactPersons ?? [];
  }

  getType(): OfficeType {
    return this.data.officeType ?? OfficeType.KITSASPRO;
  }

  async refresh(): Promise<void> {
    const { data } = await axios.get<Office>(
      `/v1/offices/${this.data.id}`,
      await this.connection.getConfig()
    );
    this.data = data;
  }

  async getBooks(bookshelfId?: string): Promise<BookListItem[]> {
    const { data } = await axios.get<BookListItem[]>(
      bookshelfId
        ? '/v1/books?bookshelf=' + bookshelfId
        : '/v1/books?office=' + this.data.id,
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

  private static findBookShelf(
    id: string,
    bookshelves: Bookshelf[]
  ): Bookshelf | undefined {
    for (const bookshelf of bookshelves) {
      if (bookshelf.id === id) {
        return bookshelf;
      }
      const sub = this.findBookShelf(id, bookshelf.subgroups);
      if (sub) {
        return sub;
      }
    }
    return undefined;
  }

  async addBookshelf(
    name: string,
    parentId?: string | undefined
  ): Promise<Bookshelf> {
    const payload = { name };
    const { data } = await axios.post<Bookshelf>(
      `/v1/bookshelves/${parentId ?? this.getId()}`,
      payload,
      await this.connection.getConfig()
    );
    await this.refresh();
    const bookshelf = KitsasOffice.findBookShelf(
      data.id,
      this.data.bookshelves
    );
    if (!bookshelf) {
      throw new Error('Bookshelf not found');
    }
    return bookshelf;
  }

  async renameBookshelf(id: string, name: string): Promise<Bookshelf> {
    const payload = { name };
    const { data } = await axios.patch<Bookshelf>(
      `/v1/bookshelves/${id}`,
      payload,
      await this.connection.getConfig()
    );
    await this.refresh();
    const bookshelf = KitsasOffice.findBookShelf(
      data.id,
      this.data.bookshelves
    );
    if (!bookshelf) {
      throw new Error('Bookshelf not found');
    }
    return bookshelf;
  }

  async deleteBookshelf(id: string): Promise<void> {
    await axios.delete(
      `/v1/bookshelves/${id}`,
      await this.connection.getConfig()
    );
    await this.refresh();
  }

  async addRole(name: LanguageString, rights: string[]): Promise<OfficeRole> {
    const payload: OfficeRoleAdd = { name, rights };
    const { data } = await axios.post<OfficeRole>(
      `/v1/roles/${this.data.id}/`,
      payload,
      await this.connection.getConfig()
    );
    await this.refresh();
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
    await this.refresh();
    return data;
  }

  async deleteRole(id: string): Promise<void> {
    await axios.delete(`/v1/roles/${id}`, await this.connection.getConfig());
    await this.refresh();
  }

  async getUsers(): Promise<UserListItem[]> {
    const { data } = await axios.get<UserListItem[]>(
      `/v1/users?officeId=${this.data.id}`,
      await this.connection.getConfig()
    );
    return data;
  }

  async addUser(
    name: string,
    email: string,
    mode:
      | UserMode.PRO
      | UserMode.CUSTOMER
      | UserMode.WEBUSER
      | UserMode.AUDITOR,
    invite: boolean
  ): Promise<UserListItem> {
    const payload = {
      name,
      email,
      mode,
      officeId: this.data.id,
      invite: invite,
    };
    const { data } = await axios.post<UserListItem>(
      `/v1/users/`,
      payload,
      await this.connection.getConfig()
    );
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`/v1/users/${id}`, await this.connection.getConfig());
  }

  async moveBook(bookId: string, bookshelfId: string): Promise<void> {
    await axios.patch(
      `/v1/books/${bookId}`,
      { bookshelf: bookshelfId },
      await this.connection.getConfig()
    );
  }

  async changePlan(bookId: string, planId: number): Promise<void> {
    await axios.patch(
      `/v1/books/${bookId}`,
      { planId },
      await this.connection.getConfig()
    );
  }

  async moveBookShelf(id: string, newParentId: string): Promise<Bookshelf> {
    await axios.patch(
      `/v1/bookshelves/${id}`,
      { parent: newParentId },
      await this.connection.getConfig()
    );
    await this.refresh();
    const bookshelf = KitsasOffice.findBookShelf(id, this.data.bookshelves);
    if (!bookshelf) {
      throw new Error('Bookshelf not found');
    }
    return bookshelf;
  }

  getCertificateInformation(): CertificateStatusInformation {
    return this.data.certificate;
  }

  async installCertificate(
    transferId: string,
    password: string
  ): Promise<CertificateFetchResult> {
    const { data } = await axios.put<CertificateFetchResult>(
      `/v1/cert/` + this.data.id,
      { transferId, password },
      await this.connection.getConfig()
    );
    return data;
  }

  async removeCertificate(): Promise<void> {
    await axios.delete(
      `/v1/cert/` + this.data.id,
      await this.connection.getConfig()
    );
  }
}
