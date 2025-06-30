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
exports.Puntaje = void 0;
const typeorm_1 = require("typeorm");
const ronda_entity_1 = require("../../rondas/entities/ronda.entity");
const ronda_equipos_entity_1 = require("../../ronda_equipos/entities/ronda_equipos.entity");
let Puntaje = class Puntaje {
    id;
    puntos;
    equipo;
    ronda;
    creado_en;
    actualizado_en;
};
exports.Puntaje = Puntaje;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Puntaje.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Puntaje.prototype, "puntos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ronda_equipos_entity_1.RondaEquipo, equipo => equipo.ronda, { onDelete: 'CASCADE' }),
    __metadata("design:type", ronda_equipos_entity_1.RondaEquipo)
], Puntaje.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ronda_entity_1.Ronda, ronda => ronda.puntajes, { onDelete: 'CASCADE' }),
    __metadata("design:type", ronda_entity_1.Ronda)
], Puntaje.prototype, "ronda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Puntaje.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Puntaje.prototype, "actualizado_en", void 0);
exports.Puntaje = Puntaje = __decorate([
    (0, typeorm_1.Entity)('puntajes'),
    (0, typeorm_1.Unique)(['equipo', 'ronda'])
], Puntaje);
//# sourceMappingURL=puntaje.entity.js.map