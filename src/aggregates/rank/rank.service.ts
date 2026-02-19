import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRankDto, UpdateRankDto } from './dto';

@Injectable()
export class RankService {
  constructor(private readonly prisma: PrismaService) {}

  async getRankById(id: string): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAll(): Promise<Prisma.RankGetPayload<object>[]> {
    return this.prisma.rank.findMany();
  }

  async createRank(dto: CreateRankDto): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.create({
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
      },
    });
  }

  async updateRank(
    id: string,
    dto: UpdateRankDto,
  ): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.update({
      where: { id },
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
      },
    });
  }

  async deleteRankById(id: string): Promise<void> {
    await this.prisma.rank.delete({
      where: { id },
    });
  }
}
