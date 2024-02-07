import { KitsasOfficeInterface } from '../interfaces/kitsasoffice.interface';
import { LanguageString, OfficeRole } from '../types';
import { BookListItem } from '../types/books';
import { Bookshelf } from '../types/office';
import { UserListItem, UserMode } from '../types/user';

export class MockKitsasOffice implements KitsasOfficeInterface {
  constructor(id: string) {
    this.id = id;
  }

  private id: string;
  private roles: OfficeRole[] = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      rights: ['Ts', 'Tt'],
      name: {
        fi: 'Käyttäjä',
        en: 'User',
        sv: 'Användare',
      },
      system: false,
    },
  ];

  private bookshelves: Bookshelf[] = [
    {
      id: '857341f7-3ace-4722-9e47-dc294fb17d2f',
      name: 'Testihylly',
      rights: ['A', 'O', 'OB', 'OD', 'OG', 'OL', 'OM', 'OP', 'OS', 'OT'],
      subgroups: [
        {
          id: '727fa3b0-5a66-4b4a-9f0e-806dc230d4a7',
          name: 'Alahylly',
          rights: ['A', 'O', 'OB', 'OD', 'OG', 'OL', 'OM', 'OP', 'OS', 'OT'],
          subgroups: [],
        },
      ],
    },
    {
      id: '86b76644-cd5b-429f-bb64-d0c641b5bb89',
      name: 'Toinen testihylly',
      rights: ['A', 'O', 'OB', 'OD', 'OG', 'OL', 'OM', 'OP', 'OS', 'OT'],
      subgroups: [],
    },
  ];

  getId(): string {
    return this.id;
  }

  getName(): string {
    return 'Mock Office';
  }

  getBusinessId(): string | undefined {
    return '1234567-8';
  }

  refresh(): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBooks(_bookshelfId?: string): Promise<BookListItem[]> {
    return new Promise<BookListItem[]>((resolve) => {
      resolve([
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Oy Firma Ab',
          businessId: '1234567-8',
          documentCount: 123,
          badges: ['Inbox', 'Outbox'],
          backend: 'KITSAS',
          group: {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Katjan hylly',
            type: 'BOOKSHELF',
          },
          created: new Date('2023-10-02T15:17:32.354Z'),
          modified: new Date('2023-10-02T15:17:32.354Z'),
          vat: {
            dueDate: new Date('2023-09-12'),
            returnedUntil: new Date('2023-06-30'),
            period: 1,
          },
        },
      ]);
    });
  }

  getRoles(): OfficeRole[] {
    return this.roles;
  }

  getBookshelves(): Bookshelf[] {
    return this.bookshelves;
  }

  private static findBookShelf(
    id: string,
    bookshelves: Bookshelf[]
  ): Bookshelf | undefined {
    for (const bookshelf of bookshelves) {
      if (bookshelf.id === id) {
        return bookshelf;
      }
      const sub = this.findBookShelf(id, bookshelf.subgroups);
      if (sub) {
        return sub;
      }
    }
    return undefined;
  }

  addBookshelf(
    name: string,
    parentId?: string | undefined
  ): Promise<Bookshelf> {
    return new Promise<Bookshelf>((resolve) => {
      const bookshelf: Bookshelf = {
        id: '8c742657-5613-4065-8173-2ba01bd28f36',
        name,
        rights: ['A', 'O', 'OB', 'OD', 'OG', 'OL', 'OM', 'OP', 'OS', 'OT'],
        subgroups: [],
      };
      if (parentId) {
        const parent = MockKitsasOffice.findBookShelf(
          parentId,
          this.bookshelves
        );
        if (parent) {
          parent.subgroups.push(bookshelf);
          this.bookshelves = this.bookshelves.map((shelf) =>
            shelf.id === parentId ? parent : shelf
          );
        }
      } else {
        this.bookshelves.push(bookshelf);
      }
      resolve(bookshelf);
    });
  }

  deleteBookshelf(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.bookshelves = this.bookshelves.filter((shelf) => shelf.id !== id);
      resolve();
    });
  }

  renameBookshelf(id: string, name: string): Promise<Bookshelf> {
    return new Promise<Bookshelf>((resolve) => {
      const bookshelf = MockKitsasOffice.findBookShelf(id, this.bookshelves);
      if (!bookshelf) {
        throw new Error('Bookshelf not found');
      }
      bookshelf.name = name;
      resolve(bookshelf);
    });
  }

  addRole(name: LanguageString, rights: string[]): Promise<OfficeRole> {
    return new Promise<OfficeRole>((resolve) => {
      const role: OfficeRole = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        rights,
        name,
        system: false,
      };
      this.roles.push(role);
      resolve(role);
    });
  }

  editRole(
    id: string,
    name: LanguageString,
    rights: string[]
  ): Promise<OfficeRole> {
    return new Promise<OfficeRole>((resolve) => {
      const role = this.roles.find((role) => role.id === id);
      if (role) {
        role.name = name;
        role.rights = rights;
        this.roles = this.roles.map((r) => (r.id === id ? role : r));
        resolve(role);
      }
    });
  }

  deleteRole(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.roles = this.roles.filter((role) => role.id !== id);
      resolve();
    });
  }

  getUsers(): Promise<UserListItem[]> {
    return new Promise<UserListItem[]>((resolve) => {
      resolve([
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Katja Käyttäjä',
          email: 'katja@testi.fi',
          mode: UserMode.PRO,
        },
      ]);
    });
  }

  addUser(
    name: string,
    email: string,
    customer: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _invite: boolean
  ): Promise<UserListItem> {
    return new Promise<UserListItem>((resolve) => {
      resolve({
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name,
        email,
        mode: customer ? UserMode.CUSTOMER : UserMode.PRO,
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteUser(_id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}
