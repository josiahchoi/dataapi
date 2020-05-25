import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';

@Module({
  imports: [TypeOrmModule.forRoot(), DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
