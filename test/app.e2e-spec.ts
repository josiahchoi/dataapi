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
      .expect(201)
  });

  it('should create initial data: Banana', () => {
    return request(app.getHttpServer())
      .post('/data')
      .send(initialDataBanana)
      .expect(201)
  });

  it('should query data with name: Apple', (done) => {
    return request(app.getHttpServer())
      .get('/data?name=Apple')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
//        expect(res.body).to.be.eql({ error: "make an error" });
        console.log(res.body)
        done();
      });
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
