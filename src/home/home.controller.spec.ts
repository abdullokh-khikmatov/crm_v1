import { Test, TestingModule } from '@nestjs/testing';
import { Home } from './home.controller';

describe('TeacherProduct', () => {
  let controller: Home;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Home],
    }).compile();

    controller = module.get<Home>(Home);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
