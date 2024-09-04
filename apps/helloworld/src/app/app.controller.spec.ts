import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });


  describe('longRunningTest', () => {
    jest.setTimeout(30000); // Set timeout to 30 seconds

    it('should handle long running operations', async () => {
      const appController = app.get<AppController>(AppController);

      // Simulate a long-running operation
      await new Promise(resolve => setTimeout(resolve, 25000));

      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
