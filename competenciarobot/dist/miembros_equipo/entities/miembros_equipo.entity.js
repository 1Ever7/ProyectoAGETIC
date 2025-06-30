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
exports.MiembroEquipo = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participantes/entities/participante.entity");
const equipo_entity_1 = require("../../equipos/entities/equipo.entity");
let MiembroEquipo = class MiembroEquipo {
    id;
    participante;
    equipo;
    creado_en;
};
exports.MiembroEquipo = MiembroEquipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MiembroEquipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participante_entity_1.Participante, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'participante_id' }),
    __metadata("design:type", participante_entity_1.Participante)
], MiembroEquipo.prototype, "participante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], MiembroEquipo.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MiembroEquipo.prototype, "creado_en", void 0);
exports.MiembroEquipo = MiembroEquipo = __decorate([
    (0, typeorm_1.Entity)('miembros_equipo'),
    (0, typeorm_1.Unique)(['participante', 'equipo'])
], MiembroEquipo);
//# sourceMappingURL=miembros_equipo.entity.js.map