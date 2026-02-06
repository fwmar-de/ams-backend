import { Address } from 'generated/prisma/client';

export class GetAddressDto {
  street: string;
  houseNumber: number;
  zipCode: number;
  city: string;
  country: string;

  constructor(address: Address) {
    this.street = address.street;
    this.houseNumber = address.houseNumber;
    this.zipCode = address.zipCode;
    this.city = address.city;
    this.country = address.country;
  }
}
