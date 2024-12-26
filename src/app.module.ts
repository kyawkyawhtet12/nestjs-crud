import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DevtoolsModule.register({}), UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
