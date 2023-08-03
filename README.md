# Kitsas Library

## Installation

```bash
npm install kitsas-library
```

## Usage

### Login to Kitsas

```typescript
import { KitsasService } from './kitsasservice';

const connection = await KitsasService.connect({
  username: 'name@kitsas.fi',
  password: 'secret',
});
```
