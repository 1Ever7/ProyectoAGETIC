"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RondaEquiposModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ronda_equipos_entity_1 = require("./entities/ronda_equipos.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const ronda_equipos_controller_1 = require("./ronda_equipos.controller");
const ronda_equipos_service_1 = require("./ronda_equipos.service");
let RondaEquiposModule = class RondaEquiposModule {
};
exports.RondaEquiposModule = RondaEquiposModule;
exports.RondaEquiposModule = RondaEquiposModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ronda_equipos_entity_1.RondaEquipo, ronda_entity_1.Ronda, equipo_entity_1.Equipo])],
        controllers: [ronda_equipos_controller_1.RondaEquiposController],
        providers: [ronda_equipos_service_1.RondaEquiposService],
    })
], RondaEquiposModule);
//# sourceMappingURL=ronda_equipos.module.js.map