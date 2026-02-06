import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
