import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/aggregates/address/dto';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({ example: 'Musterfeuerwache' })
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiPropertyOptional({ type: CreateAddressDto })
  address?: CreateAddressDto;
}
