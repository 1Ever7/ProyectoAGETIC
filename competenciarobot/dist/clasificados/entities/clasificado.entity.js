"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clasificado = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participantes/entities/participante.entity");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
let Clasificado = class Clasificado {
    id;
    participante;
    competencia;
    posicion;
    puntajeTotal;
    creadoEn;
};
exports.Clasificado = Clasificado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Clasificado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participante_entity_1.Participante, participante => participante.clasificaciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", participante_entity_1.Participante)
], Clasificado.prototype, "participante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, competencia => competencia.clasificados, { onDelete: 'CASCADE' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], Clasificado.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Clasificado.prototype, "posicion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'puntaje_total', type: 'integer' }),
    __metadata("design:type", Number)
], Clasificado.prototype, "puntajeTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Clasificado.prototype, "creadoEn", void 0);
exports.Clasificado = Clasificado = __decorate([
    (0, typeorm_1.Entity)('clasificados')
], Clasificado);
//# sourceMappingURL=clasificado.entity.js.map