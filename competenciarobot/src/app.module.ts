import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos del sistema
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TutoresModule } from './tutores/tutores.module';
import { ParticipantesModule } from './participantes/participantes.module';
import { CompetenciaModule } from './competencia/competencia.module';
import { PistasModule } from './pista/pista.module';
import { RondasModule } from './rondas/rondas.module';
import { PuntajesModule } from './puntajes/puntajes.module';
import { ClasificadosModule } from './clasificados/clasificados.module';
import { EquiposModule } from './equipos/equipos.module';
import { MiembrosEquipoModule } from './miembros_equipo/miembros_equipo.module';
import { RondaEquiposModule } from './ronda_equipos/ronda_equipos.module';
import { LogsSistemaModule } from './log_sistema/log_sistema.module';

/*



*/

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ cambiar a false en producción
    }),

    // Módulos de negocio
    AuthModule,
    UsuariosModule,
    TutoresModule,
    ParticipantesModule,
    CompetenciaModule,
    PistasModule,
    RondasModule,
    PuntajesModule,
    ClasificadosModule,
    EquiposModule,
    MiembrosEquipoModule,
    RondaEquiposModule,
    LogsSistemaModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
