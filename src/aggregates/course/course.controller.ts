import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCourseDto, GetCourseDto, UpdateCourseDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, type: GetCourseDto })
  async createCourse(@Body() dto: CreateCourseDto): Promise<GetCourseDto> {
    const newCourse = await this.courseService.createCourse(dto);
    return new GetCourseDto(newCourse);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetCourseDto })
  async getCourseById(@Param('id') id: string): Promise<GetCourseDto> {
    const course = await this.courseService.getCourseById(id);
    return new GetCourseDto(course);
  }

  @Get()
  @ApiResponse({ status: 200, type: [GetCourseDto] })
  async getAllCourses(): Promise<GetCourseDto[]> {
    const courses = await this.courseService.getAll();
    return courses.map((course) => new GetCourseDto(course));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, type: GetCourseDto })
  async updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ): Promise<GetCourseDto> {
    const updatedCourse = await this.courseService.updateCourse(id, dto);
    return new GetCourseDto(updatedCourse);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteCourseById(@Param('id') id: string): Promise<void> {
    return await this.courseService.deleteCourseById(id);
  }
}
