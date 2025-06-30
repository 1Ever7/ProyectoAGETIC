"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantesModule = void 0;
const common_1 = require("@nestjs/common");
const participantes_service_1 = require("./participantes.service");
const participantes_controller_1 = require("./participantes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const participante_entity_1 = require("./entities/participante.entity");
const tutores_module_1 = require("../tutores/tutores.module");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let ParticipantesModule = class ParticipantesModule {
};
exports.ParticipantesModule = ParticipantesModule;
exports.ParticipantesModule = ParticipantesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([participante_entity_1.Participante, competencia_entity_1.Competencia]), tutores_module_1.TutoresModule],
        controllers: [participantes_controller_1.ParticipantesController],
        providers: [participantes_service_1.ParticipantesService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ParticipantesModule);
//# sourceMappingURL=participantes.module.js.map