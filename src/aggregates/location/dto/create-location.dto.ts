import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/aggregates/address/dto';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Musterfeuerwache' })
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({ type: CreateAddressDto })
  address: CreateAddressDto;
}
