import { Injectable } from '@nestjs/common';
import { Table1DataDto } from './interfaces/table1data.dto';
import { SpecEntity } from './spec.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

@Injectable()
export class DataService {

    constructor(@InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>, @InjectRepository(DataEntity) private dataRepository: Repository<DataEntity>) { }

    findSpec = (columnName: string, specEntities: SpecEntity[]) => {
        return  specEntities.find((x) => x.columnName === columnName)
     }

    createDataEntity = (data: Table1DataDto, specEntities: SpecEntity[]): DataEntity => {
        const dataEntity = new DataEntity();
        for (let key in data){
            let spec = this.findSpec(key, specEntities)
            dataEntity[`column${spec.row}`] = this.valueConverter(data[key], spec.dataType);
        }
        return dataEntity;
    }

    valueConverter = (value: any, type: string): string => {
        switch (type) {
            case "TEXT":
            case "INTEGER":
                    return `${value}`
            case "BOOLEAN":
                if (value) {
                    return "1"
                } else {
                    return "0"
                }
            default:
                throw new Error("Type not found.")
        }
    }

    createQueryPart = (query: any, specEntities: SpecEntity[]) => {
        const queryPart = {};
        for (let key in query){
            let spec = this.findSpec(key, specEntities)
            queryPart[`column${spec.row}`] = this.valueConverter(query[key], spec.dataType);
        }
        return queryPart;
    }

    valueConverterFromString = (value: string, type: string): boolean | number | string => {
        switch (type) {
            case "TEXT":
                return value;
            case "INTEGER":
                return Number(value);
            case "BOOLEAN":
                const num = Number(value);
                if (num === 1) {
                    return true
                } else {
                    return false;
                }
            default:
                throw new Error("Type not found.")
        }
    }


    convertTable1DataDto = (dataEntity: DataEntity, specEntities: SpecEntity[]): Table1DataDto => {
        const table1Data = new Table1DataDto();
        specEntities.forEach((specEntity) => table1Data[specEntity.columnName] = this.valueConverterFromString(dataEntity[`column${specEntity.row}`], specEntity.dataType))
        console.log("Data Entity: ")
        console.log(dataEntity);
        console.log("Table1Data: ")
        console.log(table1Data);
        return table1Data;
    }


    async postData(data: Table1DataDto): Promise<DataEntity> {
        const specEntities = await this.specRepository.find()
        const dataEntity = this.createDataEntity(data, specEntities);
        return this.dataRepository.save(dataEntity);
    }

    async queryData(query: any): Promise<Table1DataDto[]> {
        const specEntities = await this.specRepository.find()
        const dataEntities = await this.dataRepository.find({where: this.createQueryPart(query, specEntities)})
        const table1DataDto: Table1DataDto[] = [];
        dataEntities.forEach((dataEntity) => table1DataDto.push(this.convertTable1DataDto(dataEntity, specEntities)))
        return new Promise<Table1DataDto[]>((resolve) => {
            resolve(table1DataDto);
          });;
    }

}
