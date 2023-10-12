import { BookListItem, LanguageString } from '../types';
import { Bookshelf, OfficeRole } from '../types/office';
import { UserListItem } from '../types/user';

export interface KitsasOfficeInterface {
  /**
   * Get the ID of the office.
   */
  getId(): string;

  /**
   * Get the name of the office.
   */
  getName(): string;

  /**
   * Get the business ID of the office.
   */
  getBusinessId?(): string | undefined;

  /**
   * Get books (organization for bookkeeping) of the office
   * @param bookshelfId Bookshelf id, returns all books if not specified
   */
  getBooks(bookshelfId?: string): Promise<BookListItem[]>;

  /**
   * Get roles of the office
   */
  getRoles(): OfficeRole[];

  /**
   * Add a role
   *
   * @param name Role name (in languages)
   * @param rights Rights for role
   */
  addRole(name: LanguageString, rights: string[]): Promise<OfficeRole>;

  /**
   * Edit a role
   * @param id Role id
   * @param name Role name (in languages)
   * @param rights Rights for role
   */
  editRole(
    id: string,
    name: LanguageString,
    rights: string[]
  ): Promise<OfficeRole>;

  /**
   * Delete a role
   * @param id Role id
   */
  deleteRole(id: string): Promise<void>;

  /**
   * Get bookshelves of the office
   */
  getBookshelves(): Bookshelf[];

  /**
   * Get users of the office
   */
  getUsers(): Promise<UserListItem[]>;
}
