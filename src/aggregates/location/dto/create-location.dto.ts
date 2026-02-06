import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Feuer- und Rettungswache Monheim am Rhein' })
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: null })
  addressId?: string;
}
