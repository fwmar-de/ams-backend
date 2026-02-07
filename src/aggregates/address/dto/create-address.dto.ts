import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Musterstraße' })
  street: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123 })
  houseNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 12345 })
  zipCode: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Musterstadt' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Deutschland' })
  country: string;
}
