import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Table1DataDto } from 'src/data/interfaces/table1data.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
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

  it('/data (POST)', () => {
    return request(app.getHttpServer())
      .post('/data')
      .send(table1data)
      .expect(201)
  });

  afterEach(async () => {
    await app.close();
  });
});
