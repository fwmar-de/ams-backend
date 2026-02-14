import { ApiProperty } from '@nestjs/swagger';
import { Address, Location } from 'generated/prisma/client';
import { GetAddressDto } from 'src/aggregates/address/dto';

export class GetLocationDto {
  @ApiProperty({ example: 'f2a9d3b7-1c4e-48f2-9d8b-7e6a5c3b2f1a' })
  id: string;

  @ApiProperty({ example: 'Musterfeuerwache' })
  name: string;

  @ApiProperty({ type: GetAddressDto })
  address?: GetAddressDto;

  constructor(location: Location & { address?: Address | null }) {
    this.id = location.id;
    this.name = location.name;
    this.address = location.address
      ? new GetAddressDto(location.address)
      : undefined;
  }
}
