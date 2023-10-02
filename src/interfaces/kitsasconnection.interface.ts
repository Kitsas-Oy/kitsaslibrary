import { BookList } from '../types/books';
import { Office, OfficeList, OfficeUser } from '../types/office';

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
  getOffices(): Promise<OfficeList[]>;

  /**
   * Get office information
   * @param id Office id
   */
  getOffice(id: string): Promise<Office>;

  /**
   * Get list of books
   * @param target Office, user or bookshelf id
   * @returns List of books
   */
  getBooks(target?: string): Promise<BookList[]>;

  /**
   * List users and their roles
   * @param target Office, bookshelf or book id
   */
  getPermissions(target: string): Promise<OfficeUser[]>;
}
