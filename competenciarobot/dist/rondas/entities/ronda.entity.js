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
exports.Ronda = void 0;
const typeorm_1 = require("typeorm");
const pista_entity_1 = require("../../pista/entities/pista.entity");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
const ronda_equipos_entity_1 = require("../../ronda_equipos/entities/ronda_equipos.entity");
const puntaje_entity_1 = require("../../puntajes/entities/puntaje.entity");
let Ronda = class Ronda {
    id;
    numeroRonda;
    fechaHora;
    estado;
    pista;
    competencia;
    creadoEn;
    actualizadoEn;
    equipos;
    puntajes;
};
exports.Ronda = Ronda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ronda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_ronda', type: 'int' }),
    __metadata("design:type", Number)
], Ronda.prototype, "numeroRonda", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_hora', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ronda.prototype, "fechaHora", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pendiente', 'en_progreso', 'finalizada'],
        default: 'pendiente',
    }),
    __metadata("design:type", String)
], Ronda.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pista_entity_1.Pista, pista => pista.rondas, { onDelete: 'SET NULL' }),
    __metadata("design:type", pista_entity_1.Pista)
], Ronda.prototype, "pista", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, competencia => competencia.rondas, { onDelete: 'CASCADE' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], Ronda.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Ronda.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'actualizado_en',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Ronda.prototype, "actualizadoEn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ronda_equipos_entity_1.RondaEquipo, rondaEquipo => rondaEquipo.ronda),
    __metadata("design:type", Array)
], Ronda.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => puntaje_entity_1.Puntaje, puntaje => puntaje.ronda),
    __metadata("design:type", Array)
], Ronda.prototype, "puntajes", void 0);
exports.Ronda = Ronda = __decorate([
    (0, typeorm_1.Entity)('rondas')
], Ronda);
//# sourceMappingURL=ronda.entity.js.map