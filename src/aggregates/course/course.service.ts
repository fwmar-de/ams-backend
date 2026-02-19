import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourseById(id: string): Promise<Prisma.CourseGetPayload<object>> {
    return this.prisma.course.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAll(): Promise<Prisma.CourseGetPayload<object>[]> {
    return this.prisma.course.findMany();
  }

  async createCourse(
    dto: CreateCourseDto,
  ): Promise<Prisma.CourseGetPayload<object>> {
    return this.prisma.course.create({
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
      },
    });
  }

  async updateCourse(
    id: string,
    dto: UpdateCourseDto,
  ): Promise<Prisma.CourseGetPayload<object>> {
    return this.prisma.course.update({
      where: { id },
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
      },
    });
  }

  async deleteCourseById(id: string): Promise<void> {
    await this.prisma.course.delete({
      where: { id },
    });
  }
}
