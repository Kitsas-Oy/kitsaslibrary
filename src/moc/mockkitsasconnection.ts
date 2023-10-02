import { randomUUID } from 'crypto';

import { KitsasConnectionInterface } from '../interfaces';
import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import { Right } from '../types';
import { AuthResponse } from '../types/authresponse';
import { AddBookResponse, BookListItem } from '../types/books';
import { OfficeInList, OfficeUser } from '../types/office';
import { PermissionPatch } from '../types/rights';

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

  getBooks(target: string): Promise<BookListItem[]> {
    if (target) {
      return new Promise((resolve) => {
        resolve([
          {
            id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
            name: 'Test Book',
            businessId: '1234567-8',
            badges: [],
            group: {
              id: target,
              name: 'Test Bookshelf',
              type: 'BOOKSHELF',
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

  getPermissions(target: string): Promise<OfficeUser[]> {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        id: randomUUID(),
        name: name,
        businessId: businessId,
      });
    });
  }

  private name: string;
}
