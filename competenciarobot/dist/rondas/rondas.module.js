"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RondasModule = void 0;
const common_1 = require("@nestjs/common");
const rondas_service_1 = require("./rondas.service");
const rondas_controller_1 = require("./rondas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ronda_entity_1 = require("./entities/ronda.entity");
const pista_entity_1 = require("../pista/entities/pista.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let RondasModule = class RondasModule {
};
exports.RondasModule = RondasModule;
exports.RondasModule = RondasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ronda_entity_1.Ronda, pista_entity_1.Pista, competencia_entity_1.Competencia])],
        controllers: [rondas_controller_1.RondasController],
        providers: [rondas_service_1.RondasService],
    })
], RondasModule);
//# sourceMappingURL=rondas.module.js.map