import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
