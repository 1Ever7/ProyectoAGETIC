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
exports.Competencia = void 0;
const typeorm_1 = require("typeorm");
const pista_entity_1 = require("../../pista/entities/pista.entity");
const participante_entity_1 = require("../../participantes/entities/participante.entity");
const ronda_entity_1 = require("../../rondas/entities/ronda.entity");
const clasificado_entity_1 = require("../../clasificados/entities/clasificado.entity");
let Competencia = class Competencia {
    id;
    nombre;
    descripcion;
    fecha_inicio;
    fecha_fin;
    numero_clasificados;
    estado;
    creado_en;
    actualizado_en;
    pistas;
    participantes;
    rondas;
    clasificados;
};
exports.Competencia = Competencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Competencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Competencia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Competencia.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Competencia.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Competencia.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 3 }),
    __metadata("design:type", Number)
], Competencia.prototype, "numero_clasificados", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'configuracion'
    }),
    __metadata("design:type", String)
], Competencia.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Competencia.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Competencia.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pista_entity_1.Pista, pista => pista.competencia),
    __metadata("design:type", Array)
], Competencia.prototype, "pistas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participante_entity_1.Participante, participante => participante.competencia),
    __metadata("design:type", Array)
], Competencia.prototype, "participantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ronda_entity_1.Ronda, ronda => ronda.competencia),
    __metadata("design:type", Array)
], Competencia.prototype, "rondas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clasificado_entity_1.Clasificado, clasificado => clasificado.competencia),
    __metadata("design:type", Array)
], Competencia.prototype, "clasificados", void 0);
exports.Competencia = Competencia = __decorate([
    (0, typeorm_1.Entity)()
], Competencia);
//# sourceMappingURL=competencia.entity.js.map