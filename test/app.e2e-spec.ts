import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
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

  const initialDataApple: Table1DataDto = {
    name: "Apple",
    valid: true,
    count: 1,
}

const initialDataBanana: Table1DataDto = {
  name: "Banana",
  valid: false,
  count: -12,
}

  const table1data: Table1DataDto = {
      name: "Cookie",
      valid: true,
      count: 103,
  }

  it('should create initial data: Apple', () => {
    return request(app.getHttpServer())
      .post('/data')
      .send(initialDataApple)
      .expect(function(res) {
        if (res.status !== HttpStatus.CREATED && res.status !== HttpStatus.CONFLICT) {
          throw Error('unexpected status code: ' + res.status);
        }
      })
  });

  it('should create initial data: Banana', () => {
    return request(app.getHttpServer())
      .post('/data')
      .send(initialDataBanana)
      .expect(function(res) {
        if (res.status !== HttpStatus.CREATED && res.status !== HttpStatus.CONFLICT) {
          throw Error('unexpected status code: ' + res.status);
        }
      })
  });

  it('should query data with name: Apple', () => {
    return request(app.getHttpServer())
      .get('/data?name=Apple')
      .expect(HttpStatus.OK)
      .expect({ name: 'Apple', valid: true, count: 1 })
//       .end((err, res) => {
//         if (err) return done(err);
// //        expect(res.body).to.be.eql({ error: "make an error" });
//         console.log(res.body)
//         done();
//       });
  });

  it('should return 404 with name: Something', () => {
    return request(app.getHttpServer())
      .get('/data?name=Something')
      .expect(HttpStatus.NOT_FOUND);
  });


  afterAll(async () => {
    await app.close();
  });

});
