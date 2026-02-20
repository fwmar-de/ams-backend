import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRankDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({ example: 'Brandoberinspektor' })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({ example: 'BOI' })
  abbreviation?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 10 })
  level?: number;
}
