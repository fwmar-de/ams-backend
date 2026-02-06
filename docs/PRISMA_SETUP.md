# Prisma Setup für AMS Backend

## ✅ Installiert und konfiguriert

### Prisma Version

- **Prisma ORM**: 7.3.0 (neueste Version)
- **@prisma/client**: 7.3.0
- **@prisma/adapter-pg**: 7.3.0 (PostgreSQL Driver Adapter)

### Konfiguration

#### 1. Schema (`prisma/schema.prisma`)

- ✅ Generator mit `moduleFormat = "cjs"` für NestJS-Kompatibilität
- ✅ Custom output path: `../generated/prisma`
- ✅ PostgreSQL datasource konfiguriert
- ✅ User Model mit `updatedAt` und optimiertem UUID-Generator

#### 2. PrismaService (`src/prisma/prisma.service.ts`)

- ✅ Extends PrismaClient
- ✅ Verwendet `@prisma/adapter-pg` für PostgreSQL
- ✅ OnModuleInit/OnModuleDestroy Lifecycle Hooks
- ✅ Logging aktiviert (query, info, warn, error)
- ✅ Connection String Validation

#### 3. PrismaModule (`src/prisma/prisma.module.ts`)

- ✅ Global Module für app-weite Verfügbarkeit
- ✅ Exportiert PrismaService

#### 4. Integration

- ✅ In AppModule importiert
- ✅ Verfügbar für alle anderen Module

## 📝 Verfügbare Prisma Scripts

```bash
# Prisma Client generieren
pnpm prisma:generate

# Migration erstellen und ausführen (Development)
pnpm prisma:migrate

# Migration in Production deployen
pnpm prisma:migrate:deploy

# Prisma Studio öffnen (Database GUI)
pnpm prisma:studio

# Database zurücksetzen (ACHTUNG: Löscht alle Daten!)
pnpm prisma:reset
```

## 🔧 Setup-Schritte

### 1. Environment Variables

Erstellen Sie eine `.env` Datei im Root-Verzeichnis:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Beispiel für lokale Entwicklung:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ams_dev"
```

### 2. Prisma Client generieren

```bash
pnpm prisma:generate
```

### 3. Datenbank Migration

```bash
# Erste Migration erstellen
pnpm prisma:migrate

# Bei Aufforderung einen Namen eingeben, z.B.: "init"
```

### 4. Backend starten

```bash
pnpm run start:dev
```

## 🎯 Nächste Schritte

### PrismaService in anderen Services verwenden

Beispiel in einem UserService:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; email: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

## 🔍 Best Practices

### 1. Type Safety

Prisma generiert TypeScript-Typen automatisch:

```typescript
import { User, Prisma } from '../../generated/prisma/client';
```

### 2. Error Handling

```typescript
try {
  const user = await this.prisma.user.create({ data });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictException('Email already exists');
    }
  }
  throw error;
}
```

### 3. Transactions

```typescript
await this.prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  await tx.profile.create({ data: { userId: user.id, ...profileData } });
});
```

## 📚 Ressourcen

- [Prisma Docs](https://www.prisma.io/docs)
- [NestJS + Prisma](https://docs.nestjs.com/recipes/prisma)
- [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client)
