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
exports.HistorialCompetencia = void 0;
const typeorm_1 = require("typeorm");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
let HistorialCompetencia = class HistorialCompetencia {
    id;
    competencia;
    gestion;
    version;
    categoria;
    nombre;
    descripcion;
    fechaInicio;
    fechaFin;
    totalParticipantes;
    totalRondas;
    observaciones;
    creadoEn;
};
exports.HistorialCompetencia = HistorialCompetencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistorialCompetencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, competencia => competencia.id, { onDelete: 'SET NULL' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], HistorialCompetencia.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], HistorialCompetencia.prototype, "gestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], HistorialCompetencia.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], HistorialCompetencia.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], HistorialCompetencia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistorialCompetencia.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], HistorialCompetencia.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], HistorialCompetencia.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_participantes', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], HistorialCompetencia.prototype, "totalParticipantes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_rondas', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], HistorialCompetencia.prototype, "totalRondas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HistorialCompetencia.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], HistorialCompetencia.prototype, "creadoEn", void 0);
exports.HistorialCompetencia = HistorialCompetencia = __decorate([
    (0, typeorm_1.Entity)('historial_competencias')
], HistorialCompetencia);
//# sourceMappingURL=historial.entity.js.map