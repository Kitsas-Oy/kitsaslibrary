import { BookList } from '../types/books';
import { Office, OfficeBook, OfficeList, OfficeUser } from '../types/office';

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
   * @returns List of books
   */
  getBooks(): Promise<BookList[]>;

  /**
   * List books
   * @param target Office or bookshelf id
   */
  getBooksOf(target: string): Promise<OfficeBook[]>;

  /**
   * List users and their roles
   * @param target Office, bookshelf or book id
   */
  getUsersOf(target: string): Promise<OfficeUser[]>;
}
