import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenProduct } from './children.controller';

describe('TeacherProduct', () => {
  let controller: ChildrenProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildrenProduct],
    }).compile();

    controller = module.get<ChildrenProduct>(ChildrenProduct);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
