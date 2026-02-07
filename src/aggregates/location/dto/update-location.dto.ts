import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/aggregates/address/dto';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Feuer- und Rettungswache Monheim am Rhein' })
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiPropertyOptional({ type: CreateAddressDto })
  address?: CreateAddressDto;
}
