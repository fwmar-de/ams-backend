import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma';
import { HealthModule } from './aggregates/health/health.module';
import { UserModule } from './aggregates/user/user.module';
import { LocationModule } from './aggregates/location/location.module';
import { CourseModule } from './aggregates/course/course.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    HttpModule,
    UserModule,
    LocationModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
