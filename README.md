# Kitsas Library

## Installation

```bash
npm install kitsas-library
```

## Usage

### Login to Kitsas

```typescript
import { KitsasService } from 'kitsaslibrary';

const connection = await KitsasService.connect({
  username: 'name@kitsas.fi',
  password: 'secret',
});
```

#### Using mock implementation

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

### Get list of books

```typescript
const books = await connection.getBooks();
```

{@link KitsasBookInterface}
{@link KitsasOfficeInterface}
{@link KitsasConnectionInterface}

### Select a book

```typescript
const book = await connection.getBook('92e71a5d-1c33-4cc9-aa83-281c05c8e4c2');
```

### Create and save a new document

```typescript
const document : CreateVoucherDto = { ... } ;
await book.saveVoucher(document, []);
```
