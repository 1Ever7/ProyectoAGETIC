"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetenciaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const competencia_service_1 = require("./competencia.service");
const competencia_controller_1 = require("./competencia.controller");
const competencia_entity_1 = require("./entities/competencia.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const miembros_equipo_entity_1 = require("../miembros_equipo/entities/miembros_equipo.entity");
const ronda_equipos_entity_1 = require("../ronda_equipos/entities/ronda_equipos.entity");
const pista_entity_1 = require("../pista/entities/pista.entity");
const clasificado_entity_1 = require("../clasificados/entities/clasificado.entity");
const puntaje_entity_1 = require("../puntajes/entities/puntaje.entity");
const participantes_module_1 = require("../participantes/participantes.module");
let CompetenciaModule = class CompetenciaModule {
};
exports.CompetenciaModule = CompetenciaModule;
exports.CompetenciaModule = CompetenciaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                competencia_entity_1.Competencia,
                participante_entity_1.Participante,
                ronda_entity_1.Ronda,
                equipo_entity_1.Equipo,
                miembros_equipo_entity_1.MiembroEquipo,
                ronda_equipos_entity_1.RondaEquipo,
                pista_entity_1.Pista,
                clasificado_entity_1.Clasificado,
                puntaje_entity_1.Puntaje,
            ]),
            participantes_module_1.ParticipantesModule,
        ],
        controllers: [competencia_controller_1.CompetenciaController],
        providers: [competencia_service_1.CompetenciaService],
    })
], CompetenciaModule);
//# sourceMappingURL=competencia.module.js.map