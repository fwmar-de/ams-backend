import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByOid(oid: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { oid },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: { ...dto },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteUserById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
