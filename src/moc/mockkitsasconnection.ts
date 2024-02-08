/* eslint-disable @typescript-eslint/no-unused-vars */

import { KitsasConnectionInterface } from '../interfaces';
import { KitsasBookInterface } from '../interfaces/kitsasbook.interface';
import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import {
  AddonCallInfo,
  AddonInfoDto,
  AddonListedDto,
  AddonLogDto,
  LanguageString,
  LogStatus,
  Notification,
  NotificationType,
  Right,
} from '../types';
import { AuthResponse } from '../types/authresponse';
import {
  AddBookResponse,
  BookListItem,
  BookOpenCountItem,
  OrganizationStatus,
  OrganizationStatusResponse,
} from '../types/books';
import { OfficeInList, PermissionUser } from '../types/office';
import { PermissionPatch } from '../types/rights';
import { UserListItem, UserMode } from '../types/user';

import { MockKitsasBook } from './mockitsasbook';
import { MockKitsasOffice } from './mockitsasoffice';

export class MockKitsasConnection implements KitsasConnectionInterface {
  constructor(response: AuthResponse) {
    this.name = response.name;
  }

  getName(): string {
    return this.name;
  }

  getOffices(): Promise<OfficeInList[]> {
    return new Promise((resolve) => {
      resolve([
        {
          id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
          name: 'Test Office',
          businessId: '1234567-8',
        },
      ]);
    });
  }

  getOffice(id: string): Promise<KitsasOfficeInterface> {
    const office = new MockKitsasOffice(id);
    return new Promise((resolve) => {
      resolve(office);
    });
  }

  getBooks(): Promise<BookListItem[]> {
    return new Promise((resolve) => {
      resolve([
        {
          id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
          name: 'Test Book',
          businessId: '1234567-8',
          badges: [],
          group: {
            id: 'e04bf1a5-9e63-4d3d-8d07-e26faf6442a3',
            name: 'Test User',
            type: 'USER',
          },
          created: new Date('2023-01-01'),
          modified: new Date('2023-09-05'),
          documentCount: 0,
          backend: 'KITSAS',
          vat: {
            dueDate: new Date('2023-10-12'),
            returnedUntil: new Date('2023-08-31'),
            period: 1,
          },
        },
      ]);
    });
  }

  getPermissions(target: string): Promise<PermissionUser[]> {
    if (target !== '1dcb9463-829f-4369-9861-ae2ce7041f03')
      throw Error('Error getting users');
    return new Promise((resolve) => {
      resolve([
        {
          id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
          name: 'Test User',
          targets: [
            {
              id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
              name: 'Test Office',
              type: 'OFFICE',
              rights: ['Ts', 'Tl'],
              roles: ['5859954a-3cf9-48cb-a328-203548b5c90e'],
            },
          ],
        },
      ]);
    });
  }

  listRights(): Promise<Right[]> {
    return new Promise((resolve) => {
      resolve([
        {
          rgt: 'Rg',
          name: {
            fi: 'Kirjanpito-oikeudet',
          },
          rgtPath: 'Rg',
        },
        {
          rgt: 'As',
          name: {
            fi: 'Asetukset',
          },
          rgtPath: 'Rg.As',
        },
        {
          rgt: 'T',
          name: {
            fi: 'Tositteet',
          },
          rgtPath: 'Rg.T',
        },
        {
          rgt: 'Ts',
          name: {
            fi: 'Tositteiden selaus',
          },
          rgtPath: 'Rg.T.Ts',
        },
        {
          rgt: 'Tk',
          name: {
            fi: 'Tositteen muokkaus',
          },
          rgtPath: 'Rg.T.Tt',
        },
        {
          rgt: 'Tl',
          name: {
            fi: 'Tositeluonnos',
          },
          rgtPath: 'Rg.T.Tl',
        },
        {
          rgt: 'L',
          name: {
            fi: 'Laskut',
          },
          rgtPath: 'Rg.L',
        },
        {
          rgt: 'Ls',
          name: {
            fi: 'Laskujen selaus',
          },
          rgtPath: 'Rg.L.Ls',
        },
        {
          rgt: 'Ll',
          name: {
            fi: 'Laskun laatiminen',
          },
          rgtPath: 'Rg.L.Ll',
        },
        {
          rgt: 'Lt',
          name: {
            fi: 'Laskun lähettäminen',
          },
          rgtPath: 'Rg.L.Lt',
        },
        {
          rgt: 'K',
          name: {
            fi: 'Kierto',
          },
          rgtPath: 'Rg.K',
        },
        {
          rgt: 'Kl',
          name: {
            fi: 'Kiertoon lisääminen',
          },
          rgtPath: 'Rg.K.Kl',
        },
        {
          rgt: 'Kt',
          name: {
            fi: 'Tarkastaminen',
          },
          rgtPath: 'Rg.K.Kt',
        },
        {
          rgt: 'Kh',
          name: {
            fi: 'Hyväksyminen',
          },
          rgtPath: 'Rg.K.Kh',
        },
        {
          rgt: 'Ks',
          name: {
            fi: 'Kaikkien kiertojen selaaminen',
          },
          rgtPath: 'Rg.K.Ks',
        },
        {
          rgt: 'Av',
          name: {
            fi: 'Alv-ilmoituksen antaminen',
          },
          rgtPath: 'Rg.Av',
        },
        {
          rgt: 'Bm',
          name: {
            fi: 'Budjetti',
          },
          rgtPath: 'Rg.Bm',
        },
        {
          rgt: 'Tp',
          name: {
            fi: 'Tilinpäätöksen laatiminen',
          },
          rgtPath: 'Rg.Tp',
        },
        {
          rgt: 'Ko',
          name: {
            fi: 'Käyttöoikeuksien myöntäminen',
          },
          rgtPath: 'Rg.Ko',
        },
        {
          rgt: 'Om',
          name: {
            fi: 'Kirjanpidon omistaja',
          },
          rgtPath: 'Om',
        },
        {
          rgt: 'Ra',
          name: {
            fi: 'Raportit',
          },
          rgtPath: 'Rg.Ra',
        },
        {
          rgt: 'Xt',
          name: {
            fi: 'Tuotteiden muokkaus',
          },
          rgtPath: 'Rg.Xt',
        },
        {
          rgt: 'Xr',
          name: {
            fi: 'Ryhmien muokkaus',
          },
          rgtPath: 'Rg.Xr',
        },
        {
          rgt: 'OD',
          name: {
            fi: 'Kirjanpdon siirtäminen ja poistaminen',
          },
          rgtPath: 'O.OD',
        },
        {
          rgt: 'OB',
          name: {
            fi: 'Kirjanpidon luominen',
          },
          rgtPath: 'O.OB',
        },
        {
          rgt: 'OP',
          name: {
            fi: 'Yksittäisten käyttöoikeksien myöntäminen',
          },
          rgtPath: 'O.OP',
        },
        {
          rgt: 'OT',
          name: {
            fi: 'Tilitoimistonäkymä',
          },
          rgtPath: 'O.OT',
        },
        {
          rgt: 'O',
          name: {
            fi: 'Tilitoimiston hallinta',
          },
          rgtPath: 'O',
        },
        {
          rgt: 'A',
          name: {
            fi: 'Hallinta',
          },
          rgtPath: 'A',
        },
        {
          rgt: 'OM',
          name: {
            fi: 'Käyttäjäryhmien muokkaaminen',
          },
          rgtPath: 'A.OM',
        },
        {
          rgt: 'OG',
          name: {
            fi: 'Ryhmien muokkaaminen',
          },
          rgtPath: 'A.OG',
        },
        {
          rgt: 'OL',
          name: {
            fi: 'Kirjautumislokien selaaminen',
          },
          rgtPath: 'A.OL',
        },
        {
          rgt: 'OS',
          name: {
            fi: 'Tukikirjautuminen',
          },
          rgtPath: 'A.OS',
        },
      ]);
    });
  }

  setPermissions(_permissions: PermissionPatch[]): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  addBook(
    _bookshelfId: string,
    name: string,
    businessId?: string | undefined
  ): Promise<AddBookResponse> {
    return new Promise((resolve) => {
      resolve({
        id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
        name: name,
        businessId: businessId,
      });
    });
  }

  deleteBook(_bookId: string): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  getBook(bookId: string): Promise<KitsasBookInterface> {
    const book = new MockKitsasBook(bookId);
    return new Promise((resolve) => {
      resolve(book);
    });
  }

  getAddonCallInfo(_callId: string): Promise<AddonCallInfo> {
    return new Promise((resolve) => {
      resolve({
        user: {
          id: '58011d04-1be6-4f26-a4ec-e00da4e78e20',
          name: 'Test User',
        },
        organization: {
          id: 'ec48e945-c961-48f6-a424-60bee35074c4',
          name: 'Test Organization',
        },
        rights: ['Ts', 'Tl'],
      });
    });
  }

  getAddonList(_target: string): Promise<AddonListedDto[]> {
    return new Promise((resolve) => {
      resolve([
        {
          id: 'e5c726c6-7614-454e-be5f-5792e7cd7bc7',
          name: {
            fi: 'Test Addon',
          },
          active: true,
        },
      ]);
    });
  }

  getAddonInfo(addonId: string, _target: string): Promise<AddonInfoDto> {
    return new Promise((resolve) => {
      resolve({
        id: addonId,
        name: {
          fi: 'Test Addon',
        },
        url: 'https://example.com',
        callId: 'eb6674d7-bbcb-41d9-8d78-9f8e22748610',
        rights: ['Ts', 'Tl'],
      });
    });
  }

  writeAddonLog(
    _bookId: string,
    _status: LogStatus,
    _message: string,
    _data?: object
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  getAddonLog(_bookId: string, _addonId?: string): Promise<AddonLogDto[]> {
    return new Promise<AddonLogDto[]>((resolve) => {
      resolve([
        {
          status: LogStatus.SUCCESS,
          message: 'Test message',
          timestamp: new Date(),
        },
      ]);
    });
  }

  saveData(_bookId: string, _key: string, _data: object): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  getData(_bookId: string, _key: string): Promise<object> {
    return new Promise<object>((resolve) => {
      resolve({
        test: 'test',
      });
    });
  }

  addNotification(
    _bookId: string,
    _type: NotificationType,
    _title: LanguageString,
    _text: LanguageString,
    _category?: string | undefined
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  replaceNotification(
    _bookId: string,
    _type: NotificationType,
    _title: LanguageString,
    _text: LanguageString,
    _category: string
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  getNotifications(
    _bookId: string,
    _addonId?: string | undefined
  ): Promise<Notification[]> {
    return new Promise<Notification[]>((resolve) => {
      resolve([
        {
          id: '8a1c6496-ba11-4659-9c0f-1b5e485a911b',
          type: NotificationType.INFO,
          title: {
            fi: 'Test Notification',
          },
          text: {
            fi: 'Test Notification Text',
          },
          category: 'test',
          created: new Date(),
        },
      ]);
    });
  }

  private name: string;

  getOrganizationStatus(
    businessId: string
  ): Promise<OrganizationStatusResponse> {
    return new Promise<OrganizationStatusResponse>((resolve) => {
      if (businessId === '1234567-8') {
        resolve({
          status: OrganizationStatus.INVALID,
          businessId: businessId,
        });
      } else if (businessId === '3093902-7') {
        resolve({
          status: OrganizationStatus.ACTIVE,
          businessId: businessId,
          name: 'Kitsas Oy',
          companyForm: 'OY',
        });
      } else {
        resolve({
          status: OrganizationStatus.FREE,
          businessId: businessId,
        });
      }
    });
  }

  findUserByEmail(email: string): Promise<UserListItem | undefined> {
    return new Promise<UserListItem | undefined>((resolve) => {
      resolve({
        id: '58011d04-1be6-4f26-a4ec-e00da4e78e20',
        name: 'Test User',
        email: email,
        mode: UserMode.NORMAL,
      });
    });
  }

  getBookOpenCounts(_bookId: string): Promise<BookOpenCountItem[]> {
    return new Promise<BookOpenCountItem[]>((resolve) => {
      resolve([
        {
          id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
          name: 'Test User',
          last: new Date(),
          count: 257,
        },
      ]);
    });
  }
}
