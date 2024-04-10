import {
  AddonCallInfo,
  AddonDataListItem,
  AddonInfoDto,
  AddonListedDto,
  AddonLogDto,
  LanguageString,
  LogStatus,
  Notification,
  NotificationType,
  Right,
} from '../types';
import {
  AddBookResponse,
  BookListItem,
  BookOpenCountItem,
  OrganizationStatusResponse,
} from '../types/books';
import { OfficeInList, PermissionUser } from '../types/office';
import { PermissionPatch } from '../types/rights';
import { UserListItem } from '../types/user';

import { KitsasBookInterface } from './kitsasbook.interface';
import { KitsasOfficeInterface } from './kitsasoffice.interface';

/**
 * Connection to Kitsas Server
 *
 * Use {@link KitsasConnection.login} to create a new connection
 *
 * You can get {@link KitsasOfficeInterface} from {@link getOffice}
 * and {@link KitsasBookInterface} from {@link getBook}
 *
 *
 */
export interface KitsasConnectionInterface {
  /**
   * Get current user's name
   * @returns User's name
   */
  getName(): string;

  /**
   * Get current user's uuid
   * @returns User's uuid
   */
  getUserId(): string;

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
   * Get list of books user has access to
   * To list book of a specific office, use getOffice(id).getBooks()
   * To list books of a specific bookshelf, use getOffice(id).getBooks(bookshelfId)
   * @returns List of books
   */
  getBooks(): Promise<BookListItem[]>;

  /**
   * Add a new book (organization for bookkeeping)
   * @param bookshelfId
   * @param name
   * @param businessId
   */
  addBook(
    bookshelfId: string,
    name: string,
    businessId?: string,
    trial?: boolean,
    backend?: string,
    planId?: number
  ): Promise<AddBookResponse>;

  /**
   * Get a book object
   * @param bookId
   */
  getBook(bookId: string): Promise<KitsasBookInterface>;

  /**
   * Delete a book
   * @param bookId
   */
  deleteBook(bookId: string): Promise<void>;

  /**
   * Get organization status (FREE, ACTIVE, INVALID) and registered name
   * @param businessId Business id
   */
  getOrganizationStatus(
    businessId: string
  ): Promise<OrganizationStatusResponse>;

  /**
   * List users and their roles
   * @param target Office, bookshelf or book id
   */
  getPermissions(target: string): Promise<PermissionUser[]>;

  /**
   * Set permissions
   * @param permissions List of permissions
   */
  setPermissions(permissions: PermissionPatch[]): Promise<void>;

  /** List rights
   * @param target Office, bookshelf or book id. Is empty, list all rights.
   * @returns List of rights
   */
  listRights(target?: string): Promise<Right[]>;

  /**
   * Get list of active and available addons
   * @param target Book id
   */
  getAddonList(target: string): Promise<AddonListedDto[]>;

  /**
   * Get addon information
   * @param addonId
   * @param target
   */
  getAddonInfo(addonId: string, target: string): Promise<AddonInfoDto>;

  /**
   * Get addon call info
   * @param callId Addon call id
   */
  getAddonCallInfo(callId: string): Promise<AddonCallInfo>;

  /**
   * Write to addon log. Only for addons!
   *
   * @param bookId Book id
   * @param status Status
   * @param message Message
   * @param data Additional data object
   */
  writeAddonLog(
    bookId: string,
    status: LogStatus,
    message: string,
    data?: object
  ): Promise<void>;

  /**
   * Get addon log.
   *
   * @param bookId Book id
   * @param addonId Addon id (optional, if not set, returns own logs)
   */
  getAddonLog(bookId: string, addonId?: string): Promise<AddonLogDto[]>;

  /**
   * Set addon data. Only for addons!
   * @param bookId Book id
   * @param key Key
   * @param data Data object
   */
  saveData(bookId: string, key: string, data: object): Promise<void>;

  /**
   * Get addon data. Only for addons!
   * @param bookId Book id
   * @param key Key
   */
  getData(bookId: string, key: string): Promise<object>;

  /**
   * List addon data. Only for addons!
   */
  listData(): Promise<AddonDataListItem[]>;

  /**
   * Add a notification. Only for addons!
   *
   * @param bookId Book id
   * @param type Notification type (info, warning, error)
   * @param title Notification title
   * @param text Notification content text
   * @param category Category (optional) for replacing notifications
   */
  addNotification(
    bookId: string,
    type: NotificationType,
    title: LanguageString,
    text: LanguageString,
    category?: string
  ): Promise<void>;

  /**
   * Replace a notification. Only for addons!
   *
   * @param bookId Book id
   * @param type Notification type (info, warning, error)
   * @param title Notification title
   * @param text Notification content text
   * @param category Category for replacing notifications
   */
  replaceNotification(
    bookId: string,
    type: NotificationType,
    title: LanguageString,
    text: LanguageString,
    category: string
  ): Promise<void>;

  /**
   * Delete a notification. Only for addons!
   *
   * @param id Notification id
   */
  deleteNotification(id: string): Promise<void>;

  /**
   * Delete notifications. Only for addons!
   *
   * @param bookId Book id
   * @param category Category (optional)
   */
  deleteNotifications(bookId: string, category?: string): Promise<void>;

  /**
   * Get notifications.
   *
   * @param bookId Book id
   * @param addonId Addon id
   */
  getNotifications(bookId: string, addonId?: string): Promise<Notification[]>;

  /**
   * Find user by email
   * @param email Email address
   */
  findUserByEmail(email: string): Promise<UserListItem | undefined>;

  /**
   * Get book open counts by user
   *
   * @param bookId Book id
   */
  getBookOpenCounts(bookId: string): Promise<BookOpenCountItem[]>;
}
