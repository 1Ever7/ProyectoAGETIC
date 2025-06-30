"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuntajesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const puntajes_service_1 = require("./puntajes.service");
const puntajes_controller_1 = require("./puntajes.controller");
const puntaje_entity_1 = require("./entities/puntaje.entity");
const ronda_equipos_entity_1 = require("../ronda_equipos/entities/ronda_equipos.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
let PuntajesModule = class PuntajesModule {
};
exports.PuntajesModule = PuntajesModule;
exports.PuntajesModule = PuntajesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([puntaje_entity_1.Puntaje, ronda_equipos_entity_1.RondaEquipo, ronda_entity_1.Ronda])],
        providers: [puntajes_service_1.PuntajesService],
        controllers: [puntajes_controller_1.PuntajesController],
    })
], PuntajesModule);
//# sourceMappingURL=puntajes.module.js.map