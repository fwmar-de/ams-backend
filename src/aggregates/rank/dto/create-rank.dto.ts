import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RankCreateInput } from 'generated/prisma/models';

export class CreateRankDto implements RankCreateInput {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Brandoberinspektor' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'BOI' })
  abbreviation: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  level: number;
}
