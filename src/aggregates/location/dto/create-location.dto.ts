import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  addressId?: string;
}
