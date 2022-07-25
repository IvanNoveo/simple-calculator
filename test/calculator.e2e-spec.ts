import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CalculatorModule } from '../src/calculator.module';

describe('CalculatorsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CalculatorModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/calculate (POST)', async () => {
    return request(app.getHttpServer())
      .post('/calculate')
      .expect(200)
      .expect('0');
  });
});
