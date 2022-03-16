import { Test, TestingModule } from '@nestjs/testing';
import { TeacherProduct } from './teachers.controller';

describe('TeacherProduct', () => {
  let controller: TeacherProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherProduct],
    }).compile();

    controller = module.get<TeacherProduct>(TeacherProduct);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
