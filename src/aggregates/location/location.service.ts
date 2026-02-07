import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly withAddress = { address: true } as const;

  async getLocationById(
    id: string,
  ): Promise<Prisma.LocationGetPayload<{ include: { address: true } }>> {
    return this.prisma.location.findUniqueOrThrow({
      where: { id },
      include: this.withAddress,
    });
  }

  async getAll(): Promise<
    Prisma.LocationGetPayload<{ include: { address: true } }>[]
  > {
    return this.prisma.location.findMany({
      include: this.withAddress,
    });
  }

  async createLocation(
    dto: CreateLocationDto,
  ): Promise<Prisma.LocationGetPayload<{ include: { address: true } }>> {
    return this.prisma.location.create({
      data: {
        name: dto.name,
        address: {
          create: dto.address,
        },
      },
      include: this.withAddress,
    });
  }

  async updateLocation(
    id: string,
    dto: UpdateLocationDto,
  ): Promise<Prisma.LocationGetPayload<{ include: { address: true } }>> {
    return this.prisma.location.update({
      where: { id },
      data: {
        name: dto.name,
        address: dto.address
          ? {
              upsert: {
                create: dto.address,
                update: dto.address,
              },
            }
          : undefined,
      },
      include: this.withAddress,
    });
  }

  async deleteLocationById(id: string): Promise<void> {
    await this.prisma.location.delete({
      where: { id },
    });
  }
}
