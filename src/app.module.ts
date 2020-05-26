import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { Connection } from 'typeorm';
import { DataController } from './data/data.controller';

const ormOptionsRuntime: TypeOrmModuleOptions = {
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

const ormOptionsE2E: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: 3306,
  username: process.env['TYPEORM_USERNAME'] || 'dataapi',
  password: process.env['TYPEORM_PASSWORD'] || 'dataapi',
  database: "dataapi",
  entities: ["src/data/**/*.entity.ts"],
  synchronize: false
}


let ormOptions = ormOptionsRuntime;

if (process.env['E2E']) {
  console.log("Using E2E orm options")
  ormOptions = ormOptionsE2E;
} else {
  console.log("Using Runtime orm options")
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
