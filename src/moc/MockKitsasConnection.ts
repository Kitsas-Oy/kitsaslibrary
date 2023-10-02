import { KitsasConnectionInterface } from '../interfaces';
import { AuthResponse } from '../types/authresponse';
import { BookList } from '../types/books';
import { Office, OfficeList, OfficeUser } from '../types/office';

export class MockKitsasConnection implements KitsasConnectionInterface {
  constructor(response: AuthResponse) {
    this.name = response.name;
  }

  getName(): string {
    return this.name;
  }

  getOffices(): Promise<OfficeList[]> {
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

  getOffice(id: string): Promise<Office> {
    if (id !== '1dcb9463-829f-4369-9861-ae2ce7041f03')
      throw Error('Error getting office');
    return new Promise((resolve) => {
      resolve({
        id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
        name: 'Test Office',
        created: new Date(),
        businessId: '1234567-8',
        officeType: 'KITSASPRO',
        roles: [
          {
            id: '5859954a-3cf9-48cb-a328-203548b5c90e',
            name: {
              fi: 'Test Role',
            },
            rights: ['Ts', 'Tl'],
          },
        ],
        bookshelves: [
          {
            id: 'e04bf1a5-9e63-4d3d-8d07-e26faf6442a3',
            name: 'Test Bookshelf',
            path: 'e04bf1a5-9e63-4d3d-8d07-e26faf6442a3',
          },
        ],
      });
    });
  }

  getBooks(target: string): Promise<BookList[]> {
    if (target) {
      return new Promise((resolve) => {
        resolve([
          {
            id: '1dcb9463-829f-4369-9861-ae2ce7041f03',
            name: 'Test Book',
            businessId: '1234567-8',
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

  private name: string;
}
