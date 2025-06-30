"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiembrosEquipoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const miembros_equipo_service_1 = require("./miembros_equipo.service");
const miembros_equipo_controller_1 = require("./miembros_equipo.controller");
const miembros_equipo_entity_1 = require("./entities/miembros_equipo.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
let MiembrosEquipoModule = class MiembrosEquipoModule {
};
exports.MiembrosEquipoModule = MiembrosEquipoModule;
exports.MiembrosEquipoModule = MiembrosEquipoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([miembros_equipo_entity_1.MiembroEquipo, equipo_entity_1.Equipo, participante_entity_1.Participante])],
        controllers: [miembros_equipo_controller_1.MiembrosEquipoController],
        providers: [miembros_equipo_service_1.MiembrosEquipoService],
        exports: [miembros_equipo_service_1.MiembrosEquipoService],
    })
], MiembrosEquipoModule);
//# sourceMappingURL=miembros_equipo.module.js.map