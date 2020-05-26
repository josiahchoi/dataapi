import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataEntity } from './data.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SpecEntity } from './spec.entity';

const ormOptions: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: 3306,
  username: process.env['TYPEORM_USERNAME'] || 'dataapi',
  password: process.env['TYPEORM_PASSWORD'] || 'dataapi',
  database: "dataapi",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
}

const aaa: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: 3306,
  username: process.env['TYPEORM_USERNAME'] || 'dataapi',
  password: process.env['TYPEORM_PASSWORD'] || 'dataapi',
  database: "dataapi",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
}

@Module({
  imports: [TypeOrmModule.forFeature([SpecEntity, DataEntity])/*TypeOrmModule.forRoot(aaa), TypeOrmModule.forFeature([SpecEntity]), TypeOrmModule.forRoot(ormOptions),  TypeOrmModule.forRoot({entities: [SpecEntity]}) */],
  providers: [DataService],
  controllers: [DataController],
//  exports: [TypeOrmModule]
})
export class DataModule {}
