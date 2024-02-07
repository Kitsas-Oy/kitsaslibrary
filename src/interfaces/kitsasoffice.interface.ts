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
   * Refresh office data
   */
  refresh(): Promise<void>;

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
   * Add new bookshelf
   * @param name Name of bookshelf
   * @param parentId Id of parent bookshelf, or undefined if top level
   */
  addBookshelf(name: string, parentId?: string): Promise<Bookshelf>;

  /**
   * Remove bookshelf
   * @param id Bookshelf id
   */
  deleteBookshelf(id: string): Promise<void>;

  /**
   * Rename bookshelf
   * @param id Bookshelf id
   * @param name New name for bookshelf
   */
  renameBookshelf(id: string, name: string): Promise<Bookshelf>;

  /**
   * Get users of the office
   */
  getUsers(): Promise<UserListItem[]>;

  /**
   * Add a new user
   *
   * User should not exist in the system
   *
   * @param name User's name
   * @param email User's email address
   * @param customer Is customer of accounting office
   * @param invite Send invitation email to user
   */
  addUser(
    name: string,
    email: string,
    customer: boolean,
    invite: boolean
  ): Promise<UserListItem>;

  /**
   * Delete a user
   * @param id
   */
  deleteUser(id: string): Promise<void>;
}
