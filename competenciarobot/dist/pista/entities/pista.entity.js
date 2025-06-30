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
exports.Pista = void 0;
const typeorm_1 = require("typeorm");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
const ronda_entity_1 = require("../../rondas/entities/ronda.entity");
const enums_1 = require("../../common/enums");
let Pista = class Pista {
    id;
    nombre;
    estado;
    competencia;
    creado_en;
    actualizado_en;
    rondas;
};
exports.Pista = Pista;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pista.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, default: 'Nombre temporal' }),
    __metadata("design:type", String)
], Pista.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.EstadoPista, default: enums_1.EstadoPista.DISPONIBLE }),
    __metadata("design:type", String)
], Pista.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, competencia => competencia.pistas, { onDelete: 'CASCADE' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], Pista.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en' }),
    __metadata("design:type", Date)
], Pista.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'actualizado_en' }),
    __metadata("design:type", Date)
], Pista.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ronda_entity_1.Ronda, ronda => ronda.pista),
    __metadata("design:type", Array)
], Pista.prototype, "rondas", void 0);
exports.Pista = Pista = __decorate([
    (0, typeorm_1.Entity)('pistas')
], Pista);
//# sourceMappingURL=pista.entity.js.map