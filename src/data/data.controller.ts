import { Controller, Post, Body, Res, Get, Param, Query, Delete, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DataService } from './data.service';
import { Table1DataDto } from './interfaces/table1data.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async query(@Query() query, @Res() res:Response): Promise<Response> {
      try {
        const dataEntities = await this.dataService.queryData(query);
        return res.status(HttpStatus.OK).json(dataEntities);
        //return res.status(201).send();
      } catch (e) {
        if (e instanceof EntityNotFoundError){
          return res.status(HttpStatus.NOT_FOUND).send();
        } else {
          return res.status(HttpStatus.BAD_REQUEST).send();  
        }
      }
    } 

    @UseGuards(JwtAuthGuard)
    @Post()
    async postData(@Body() data : Table1DataDto, @Res() res:Response): Promise<Response> {
      try {
        await this.dataService.postData(data);
        return res.status(HttpStatus.CREATED).send();
      } catch (e) {
          if (e instanceof Error){
            if (e.message === "Duplicated") {
              return res.status(HttpStatus.CONFLICT).send();
            }
          }
          return res.status(HttpStatus.BAD_REQUEST).send(); 
      }
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateData(@Body() data : Table1DataDto, @Res() res:Response): Promise<Response> {
      try {
        await this.dataService.updateData(data);
        return res.status(HttpStatus.OK).send();
      } catch (e) {
          if (e instanceof EntityNotFoundError){
              return res.status(HttpStatus.NOT_FOUND).send();
          }
          return res.status(HttpStatus.BAD_REQUEST).send(); 
      }
    }



}
