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
exports.Equipo = void 0;
const typeorm_1 = require("typeorm");
const miembros_equipo_entity_1 = require("../../miembros_equipo/entities/miembros_equipo.entity");
const ronda_equipos_entity_1 = require("../../ronda_equipos/entities/ronda_equipos.entity");
const puntaje_entity_1 = require("../../puntajes/entities/puntaje.entity");
let Equipo = class Equipo {
    id;
    color;
    creado_en;
    actualizado_en;
    miembros;
    rondas;
    puntajes;
};
exports.Equipo = Equipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Equipo.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Equipo.prototype, "creado_en", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Equipo.prototype, "actualizado_en", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => miembros_equipo_entity_1.MiembroEquipo, miembro => miembro.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "miembros", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ronda_equipos_entity_1.RondaEquipo, rondaEquipo => rondaEquipo.ronda),
    __metadata("design:type", Array)
], Equipo.prototype, "rondas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => puntaje_entity_1.Puntaje, puntaje => puntaje.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "puntajes", void 0);
exports.Equipo = Equipo = __decorate([
    (0, typeorm_1.Entity)()
], Equipo);
//# sourceMappingURL=equipo.entity.js.map