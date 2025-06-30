"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasificadosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clasificados_service_1 = require("./clasificados.service");
const clasificados_controller_1 = require("./clasificados.controller");
const clasificado_entity_1 = require("./entities/clasificado.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let ClasificadosModule = class ClasificadosModule {
};
exports.ClasificadosModule = ClasificadosModule;
exports.ClasificadosModule = ClasificadosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([clasificado_entity_1.Clasificado, participante_entity_1.Participante, competencia_entity_1.Competencia])],
        providers: [clasificados_service_1.ClasificadosService],
        controllers: [clasificados_controller_1.ClasificadosController],
    })
], ClasificadosModule);
//# sourceMappingURL=clasificados.module.js.map