"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const tutores_module_1 = require("./tutores/tutores.module");
const participantes_module_1 = require("./participantes/participantes.module");
const competencia_module_1 = require("./competencia/competencia.module");
const pista_module_1 = require("./pista/pista.module");
const rondas_module_1 = require("./rondas/rondas.module");
const puntajes_module_1 = require("./puntajes/puntajes.module");
const clasificados_module_1 = require("./clasificados/clasificados.module");
const equipos_module_1 = require("./equipos/equipos.module");
const miembros_equipo_module_1 = require("./miembros_equipo/miembros_equipo.module");
const ronda_equipos_module_1 = require("./ronda_equipos/ronda_equipos.module");
const log_sistema_module_1 = require("./log_sistema/log_sistema.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? '5432', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            tutores_module_1.TutoresModule,
            participantes_module_1.ParticipantesModule,
            competencia_module_1.CompetenciaModule,
            pista_module_1.PistasModule,
            rondas_module_1.RondasModule,
            puntajes_module_1.PuntajesModule,
            clasificados_module_1.ClasificadosModule,
            equipos_module_1.EquiposModule,
            miembros_equipo_module_1.MiembrosEquipoModule,
            ronda_equipos_module_1.RondaEquiposModule,
            log_sistema_module_1.LogsSistemaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map