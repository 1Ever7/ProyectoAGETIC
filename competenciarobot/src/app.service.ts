import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      sistema: 'Competencia de Robots Sumo',
      version: '1.0.0',
      estado: 'online',
      fecha: new Date().toISOString(),
    };
  }

  getBienvenida() {
    return 'Bienvenido al sistema de Competencia de Robots Sumo';
  }
}
