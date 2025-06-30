import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET /', () => {
    it('debe retornar el mensaje de bienvenida', () => {
      expect(appController.bienvenida()).toBe(
        'Bienvenido al sistema de Competencia de Robots Sumo',
      );
    });
  });

  describe('GET /status', () => {
    it('debe retornar el estado del sistema como objeto', () => {
      const result = appController.status();

      expect(result).toHaveProperty('sistema');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('estado');
      expect(result).toHaveProperty('fecha');
    });
  });
});
