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

  it('should create initial data: Apple', () => {
    const initialDataApple: Table1DataDto = {
      name: "Apple",
      valid: true,
      count: 1,
    }
  
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
    const initialDataBanana: Table1DataDto = {
      name: "Banana",
      valid: false,
      count: -12,
    }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(initialDataBanana)
      .expect(function(res) {
        if (res.status !== HttpStatus.CREATED && res.status !== HttpStatus.CONFLICT) {
          throw Error('unexpected status code: ' + res.status);
        }
      })
  });

  it('should create initial data: Cookie', () => {
    const initialDataCookie: Table1DataDto = {
      name: "Cookie",
      valid: true,
      count: 103,
  }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(initialDataCookie)
      .expect(function(res) {
        if (res.status !== HttpStatus.CREATED && res.status !== HttpStatus.CONFLICT) {
          throw Error('unexpected status code: ' + res.status);
        }
      })
  });

  it('should not allow invalid data with attribute not in spec', () => {
    const invalidData = {
      name: "InvalidAttribute",
      valid: true,
      other: 103,
  }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('should not allow invalid data with data in wrong datatype INTEGER', () => {
    const invalidData = {
      name: "WrongDataTypeInteger",
      valid: true,
      count: 0.5,
  }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('should not allow invalid data with data in wrong datatype BOOLEAN', () => {
    const invalidData = {
      name: "WrongDataTypeBoolean",
      valid: 'true',
      count: 5,
  }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('should not allow invalid data with data in wrong datatype STRING', () => {
    const invalidData = {
      name: 40,
      valid: true,
      count: 10,
  }
    
    return request(app.getHttpServer())
      .post('/data')
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
  });




  it('should query data with name: Apple', () => {
    return request(app.getHttpServer())
      .get('/data?name=Apple')
      .expect(HttpStatus.OK)
      .expect({ name: 'Apple', valid: true, count: 1 })
  });

  it('should return 404 with name: Something', () => {
    return request(app.getHttpServer())
      .get('/data?name=Something')
      .expect(HttpStatus.NOT_FOUND);
  });


  it('should update Banana Data', () => {
    const updatedBanadaData: Table1DataDto = {
      name: "Banana",
      valid: true,
      count: 12,
    }
    
    return request(app.getHttpServer())
      .put('/data')
      .send(updatedBanadaData)
      .expect(HttpStatus.OK)
  });

  it('should verify updated Banana Data', () => {
    const updatedBanadaData = {
      name: "Banana",
      valid: true,
      count: 12,
    }

    return request(app.getHttpServer())
    .get('/data?name=Banana')
    .expect(HttpStatus.OK)
    .expect(updatedBanadaData)
  });

  it('should not update Banana Data with attribute not in spec', () => {
    const updatedBanadaData = {
      name: "Banana",
      valid: true,
      other: 12,
    }
    
    return request(app.getHttpServer())
      .put('/data')
      .send(updatedBanadaData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  afterAll(async () => {
    await app.close();
  });

});
