import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  houseNumber: number;

  @IsNotEmpty()
  @IsNumber()
  zipCode: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
