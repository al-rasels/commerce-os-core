import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlatformModule } from './modules/platform/platform.module';
import { CommerceModule } from './modules/commerce/commerce.module';
import { ExperienceModule } from './modules/experience/experience.module';

@Module({
  imports: [PrismaModule, PlatformModule, CommerceModule, ExperienceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}