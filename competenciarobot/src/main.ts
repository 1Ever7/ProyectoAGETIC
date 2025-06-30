import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';





dotenv.config(); // Carga las variables de entorno del archivo .env

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    }),
  });

  app.setGlobalPrefix('api');
  
  // 🛡️ Seguridad
  app.use(helmet());

  // 🌐 CORS (puedes configurar orígenes específicos si lo necesitas)
  app.use(cors());

  // ✅ Validaciones globales para DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

 

  // 📄 Swagger
  const config = new DocumentBuilder()
    .setTitle('Competencia de Robots Sumo')
    .setDescription('API para la gestión del torneo de robots sumo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  logger.log(`📄 Swagger disponible en: http://localhost:${port}/api`);
}
bootstrap();

