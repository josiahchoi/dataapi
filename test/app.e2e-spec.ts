import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Table1DataDto } from 'src/data/interfaces/table1data.dto';
import { access } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let accessToken = "";

  it('should not allow to access user profile without valid token', () => {  
    return request(app.getHttpServer())
      .get('/profile')
      .set({Authorization: `Bearer ${accessToken}`})
      .expect(HttpStatus.UNAUTHORIZED)
  });

  it('should login system before do anything', (done) => {
    const login = {username: "josiah", password: "secret"}
  
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(login)
      .expect(HttpStatus.CREATED)
      .end((_, res) => {
        accessToken = res.body.access_token
        done();
      });
  });

  it('should allow to access user profile without token', () => {  
    return request(app.getHttpServer())
      .get('/profile')
      .set({Authorization: `Bearer ${accessToken}`})
      .expect(HttpStatus.OK)
  });

  it('should should create initial data without valid token', () => {
    const initialDataApple: Table1DataDto = {
      name: "Apple",
      valid: true,
      count: 1,
    }
  
    return request(app.getHttpServer())
      .post('/data')
      .set({Authorization: `Bearer `})
      .send(initialDataApple)
      .expect(HttpStatus.UNAUTHORIZED)
  });

  it('should create initial data: Apple', () => {
    const initialDataApple: Table1DataDto = {
      name: "Apple",
      valid: true,
      count: 1,
    }
  
    return request(app.getHttpServer())
      .post('/data')
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
      .send(invalidData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('should not query data without valid token', () => {
    return request(app.getHttpServer())
      .get('/data?name=Apple')
      .set({Authorization: `Bearer `})
      .expect(HttpStatus.UNAUTHORIZED)
  });

  it('should query data with name: Apple', () => {
    return request(app.getHttpServer())
      .get('/data?name=Apple')
      .set({Authorization: `Bearer ${accessToken}`})
      .expect(HttpStatus.OK)
      .expect({ name: 'Apple', valid: true, count: 1 })
  });

  it('should return 404 with name: Something', () => {
    return request(app.getHttpServer())
      .get('/data?name=Something')
      .set({Authorization: `Bearer ${accessToken}`})
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should update Banana Data with valid token', () => {
    const updatedBanadaData: Table1DataDto = {
      name: "Banana",
      valid: true,
      count: 12,
    }
    
    return request(app.getHttpServer())
      .put('/data')
      .set({Authorization: `Bearer `})
      .send(updatedBanadaData)
      .expect(HttpStatus.UNAUTHORIZED)
  });

  it('should update Banana Data', () => {
    const updatedBanadaData: Table1DataDto = {
      name: "Banana",
      valid: true,
      count: 12,
    }
    
    return request(app.getHttpServer())
      .put('/data')
      .set({Authorization: `Bearer ${accessToken}`})
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
    .set({Authorization: `Bearer ${accessToken}`})
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
      .set({Authorization: `Bearer ${accessToken}`})
      .send(updatedBanadaData)
      .expect(HttpStatus.BAD_REQUEST)
  });

  afterAll(async () => {
    await app.close();
  });

});
