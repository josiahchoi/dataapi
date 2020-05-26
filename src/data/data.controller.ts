import { Controller, Post, Body, Res, Get, Param, Query } from '@nestjs/common';
import { Response } from 'express';
import { DataService } from './data.service';
import { Table1DataDto } from './interfaces/table1data.dto';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    async query(@Query() query, @Res() res:Response): Promise<Response> {
      try {
        const dataEntities = await this.dataService.queryData(query);
        return res.status(200).json(dataEntities);
        //return res.status(201).send();
      } catch (e) {
        console.log("Error is: " + e);
        return res.status(400).send();
      }
    } 

    @Post()
    async postData(@Body() data : Table1DataDto, @Res() res:Response): Promise<Response> {
      try {
        await this.dataService.postData(data);
        return res.status(201).send();
      } catch (e) {
        console.log("Error is: " + e);
        return res.status(400).send();
      }
    }

}
