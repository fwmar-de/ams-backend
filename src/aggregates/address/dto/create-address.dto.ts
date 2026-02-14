import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
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
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Musterstadt' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Deutschland' })
  country: string;
}
