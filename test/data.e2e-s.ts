import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Table1DataDto } from 'src/data/interfaces/table1data.dto';
import { DataModule } from '../src/data/data.module';

describe('DataController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DataModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/data (GET)', () => {
    return request(app.getHttpServer())
      .get('/data')
      .expect(200)
  });

  /*
  const table1data: Table1DataDto = {
      name: "Cookie",
      valid: true,
      count: 1,
  }

  it('/data (POST)', () => {
    return request(app.getHttpServer())
      .post('/data')
      .send(table1data)
      .expect(201)
  });
  */

  /*
  afterEach(async () => {
    await app.close();
  });
  */
});
