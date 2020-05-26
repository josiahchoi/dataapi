import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { Connection } from 'typeorm';
import { DataController } from './data/data.controller';

const ormOptions: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: 3306,
  username: process.env['TYPEORM_USERNAME'] || 'dataapi',
  password: process.env['TYPEORM_PASSWORD'] || 'dataapi',
  database: "dataapi",
//  entities_old: ["dist/**/*.entity{.ts,.js}", "src/data/**/*.entity.ts"],
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
}
@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), DataModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
