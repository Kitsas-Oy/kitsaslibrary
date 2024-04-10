import { BookListItem, LanguageString } from '../types';
import {
  CertificateFetchResult,
  CertificateStatusInformation,
} from '../types/certificate';
import {
  Bookshelf,
  OfficeContactPerson,
  OfficeCustomization,
  OfficeRole,
  OfficeType,
} from '../types/office';
import { UserListItem, UserMode } from '../types/user';

/**
 * Interface to office, role and bookshelf management
 *
 * You get KitsasOfficeInterface from {@link KitsasConnectionInterface.getOffice}
 */
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
  getBusinessId(): string | undefined;

  /**
   * Get customization of the office
   */
  getCustomization(): OfficeCustomization | undefined;

  /**
   * Get contact persons of the office
   */
  getContactPersons(): OfficeContactPerson[];
  /**
   * Get the type of the office
   */
  getType(): OfficeType;

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
   * Move bookshef
   * @param id
   * @param newParentId
   */
  moveBookShelf(id: string, newParentId: string): Promise<Bookshelf>;

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
   * @param mode User mode (UserMode.PRO, UserMode.CUSTOMER or UserMode.WEBUSER)
   * @param invite Send invitation email to user
   */
  addUser(
    name: string,
    email: string,
    mode:
      | UserMode.PRO
      | UserMode.CUSTOMER
      | UserMode.WEBUSER
      | UserMode.AUDITOR,
    invite: boolean
  ): Promise<UserListItem>;

  /**
   * Delete a user
   * @param id
   */
  deleteUser(id: string): Promise<void>;

  /**
   * Move book to another bookshelf
   * @param bookId Book id
   * @param bookshelfId Destination bookshelf id
   */
  moveBook(bookId: string, bookshelfId: string): Promise<void>;

  /**
   * Change plan of a book
   * @param bookId Book id
   * @param planId Plan id
   */
  changePlan(bookId: string, planId: number): Promise<void>;

  /**
   * Get information about the certificate
   */
  getCertificateInformation(): CertificateStatusInformation;

  /**
   * Fetch a new Tulorekisteri cetificate
   * @param transferId
   * @param password
   */
  installCertificate(
    transferId: string,
    password: string
  ): Promise<CertificateFetchResult>;

  /**
   * Remove the current Tulorekisteri cetificate
   */
  removeCertificate(): Promise<void>;
}
