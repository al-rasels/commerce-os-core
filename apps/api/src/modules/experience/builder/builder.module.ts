import { Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BuilderController],
  providers: [BuilderService, PageLayoutRepository],
  exports: [BuilderService],
})
export class BuilderModule {}
