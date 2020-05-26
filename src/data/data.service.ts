import { Injectable } from '@nestjs/common';
import { Table1DataDto } from './interfaces/table1data.dto';
import { SpecEntity } from './spec.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

@Injectable()
export class DataService {

//    constructor(@InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>, @InjectRepository(DataEntity) private dataRepository: Repository<DataEntity>) { }
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


    async postData(data: Table1DataDto): Promise<DataEntity> {
        console.log(data);
        const count = await this.specRepository.count()

        const specEntities = await this.specRepository.find()
        console.log("Length: " + specEntities.length);
        console.log(specEntities);
        
        const dataEntity = this.createDataEntity(data, specEntities);
        

        return this.dataRepository.save(dataEntity);
        //throw new Error("Serious Error!!")
    }



}
