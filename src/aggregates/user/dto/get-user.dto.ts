import { User } from 'generated/prisma/client';

export class GetUserDto {
  id: string;
  mpid?: string;
  oid: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
  addressId?: string;
  rankId?: string;

  constructor(user: User) {
    this.id = user.id;
    this.mpid = user.mpid ?? undefined;
    this.oid = user.oid;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt ?? undefined;
    this.addressId = user.addressId ?? undefined;
    this.rankId = user.rankId ?? undefined;
  }
}
