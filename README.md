# Kitsas Library

Library to connect Kitsas Server. See also [template to Kitsas addon](https://github.com/Kitsas-Oy/kitsas-addon-template).

This typedoc documentation is available at [GitHub pages](https://kitsas-oy.github.io/kitsaslibrary/index.html)

## Installation

```bash
npm install kitsas-library
```

## Main components

| Component                         | Usage                                    |
| --------------------------------- | ---------------------------------------- |
| {@link KitsasService}             | Static class to connect server           |
| {@link KitsasConnectionInterface} | General operations                       |
| {@link KitsasOfficeInterface}     | Accounting office, bookshelves and roles |
| {@link KitsasBookInterface}       | Accounting interface                     |

First create a connection with {@link KitsasService}.

## Some examples

### Login to Kitsas

```typescript
import { KitsasService } from 'kitsaslibrary';

const connection = await KitsasService.connect({
  username: 'name@kitsas.fi',
  password: 'secret',
});
```

### Get list of books

```typescript
const books = await connection.getBooks();
```

### Select a book

```typescript
const book = await connection.getBook('92e71a5d-1c33-4cc9-aa83-281c05c8e4c2');
```

### Create and save a new document

```typescript
const document : CreateVoucherDto = { ... } ;
await book.saveVoucher(document, []);
```

### Using mock implementation

```typescript
const connection = await KitsasService.connect({
  username: 'test@kitsas.fi',
  password: 'Test+12345',
  mock: true,
});

const connectionWith2FA = await KitsasService.connect({
  username: 'use2fa@kitsas.fi',
  password: 'Test+12345',
  code: '123456',
  mock: true,
});
```
