import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Table1DataDto } from 'src/data/interfaces/table1data.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;



  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    console.log("Test 1");
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  const table1data: Table1DataDto = {
      name: "Cookie",
      valid: true,
      count: 1,
  }

  it('/data (GET)', () => {
    console.log("Test 2");

    return request(app.getHttpServer())
      .get('/data')
      .expect(200)
  });

  it('/data (POST)', () => {
    console.log("Test 3");

    return request(app.getHttpServer())
      .post('/data')
      .send(table1data)
      .expect(201)
  });


  /*
  it('/data (GET)', () => {
    return request(app.getHttpServer())
      .get('/data')
      .expect(200)
  });*/

  afterAll(async () => {
    await app.close();
  });

});
