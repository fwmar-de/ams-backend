import { Location } from 'generated/prisma/client';

export class GetLocationDto {
  id: string;
  name: string;
  addressId?: string;

  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
    this.addressId = location.addressId ?? undefined;
  }
}
