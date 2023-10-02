import { Right } from '../types';
import { AddBookResponse, BookListItem } from '../types/books';
import { OfficeInList, OfficeUser } from '../types/office';
import { PermissionPatch } from '../types/rights';

import { KitsasOfficeInterface } from './kitsasoffice.interface';

export interface KitsasConnectionInterface {
  /**
   * Get current user's name
   * @returns User's name
   */
  getName(): string;

  /**
   * Get list of offices
   * @returns List of offices
   */
  getOffices(): Promise<OfficeInList[]>;

  /**
   * Get office object
   * @param id Office id
   */
  getOffice(id: string): Promise<KitsasOfficeInterface>;

  /**
   * Get list of books
   * @param target Office, user or bookshelf id
   * @returns List of books
   */
  getBooks(target?: string): Promise<BookListItem[]>;

  /**
   * Add a new book (organization for bookkeeping)
   * @param bookshelfId
   * @param name
   * @param businessId
   */
  addBook(
    bookshelfId: string,
    name: string,
    businessId?: string
  ): Promise<AddBookResponse>;

  /**
   * List users and their roles
   * @param target Office, bookshelf or book id
   */
  getPermissions(target: string): Promise<OfficeUser[]>;

  /**
   * Set permissions
   * @param permissions List of permissions
   */
  setPermissions(permissions: PermissionPatch[]): Promise<void>;

  /** List rights
   * @returns List of rights
   */
  listRights(): Promise<Right[]>;
}
