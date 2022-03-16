import { Test, TestingModule } from '@nestjs/testing';
import { Orders } from './orders.controller';

describe('TeacherProduct', () => {
  let controller: Orders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Orders],
    }).compile();

    controller = module.get<Orders>(Orders);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
