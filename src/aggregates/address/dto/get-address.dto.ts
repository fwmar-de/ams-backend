import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'generated/prisma/client';

export class GetAddressDto {
  @ApiProperty({ example: 'Musterstraße' })
  street: string;

  @ApiProperty({ example: 123 })
  houseNumber: number;

  @ApiProperty({ example: 12345 })
  zipCode: number;

  @ApiProperty({ example: 'Musterstadt' })
  city: string;

  @ApiProperty({ example: 'Deutschland' })
  country: string;

  constructor(address: Address) {
    this.street = address.street;
    this.houseNumber = address.houseNumber;
    this.zipCode = address.zipCode;
    this.city = address.city;
    this.country = address.country;
  }
}
