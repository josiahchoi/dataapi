import { Injectable } from '@nestjs/common';
import { Table1DataDto } from './interfaces/table1data.dto';

@Injectable()
export class DataService {
    postData(data: Table1DataDto): void {
        console.log(data);
        //throw new Error("Serious Error!!")
    }
}
