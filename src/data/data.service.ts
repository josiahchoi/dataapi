import { Injectable } from '@nestjs/common';
import { Table1DataDto } from './interfaces/table1data.dto';
import { SpecEntity } from './spec.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

@Injectable()
export class DataService {

//    constructor(@InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>, @InjectRepository(DataEntity) private dataRepository: Repository<DataEntity>) { }
    constructor(@InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>) { }


    async postData(data: Table1DataDto): Promise<void> {
        console.log(data);
        const count = await this.specRepository.count()
        console.log("Count: " + count);

        //throw new Error("Serious Error!!")
    }
}
