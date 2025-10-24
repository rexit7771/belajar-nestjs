import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import httpMock from "node-mocks-http";
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should say hello', async () => {
    const response = await controller.sayHello("Bagus");
    expect(response).toBe("Hello Bagus")
  });

  it("should render view", async () => {
    const response = httpMock.createResponse();
    controller.viewHello("Bagus", response);

    expect(response._getRenderView()).toBe("index.html");
    expect(response._getRenderData()).toEqual({
      title: "Template Engine",
      name: "Bagus"
    })
  })
});
