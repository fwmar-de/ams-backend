import { Injectable } from '@nestjs/common';
import { Location } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getLocationById(id: string): Promise<Location> {
    return this.prisma.location.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAll(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async createLocation(dto: CreateLocationDto): Promise<Location> {
    return this.prisma.location.create({
      data: { ...dto },
    });
  }

  async updateLocation(id: string, dto: UpdateLocationDto): Promise<Location> {
    return this.prisma.location.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteLocationById(id: string): Promise<void> {
    await this.prisma.location.delete({
      where: { id },
    });
  }
}
