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
exports.Participante = void 0;
const typeorm_1 = require("typeorm");
const tutor_entity_1 = require("../../tutores/entities/tutor.entity");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
const miembros_equipo_entity_1 = require("../../miembros_equipo/entities/miembros_equipo.entity");
const clasificado_entity_1 = require("../../clasificados/entities/clasificado.entity");
let Participante = class Participante {
    id;
    nombreEquipo;
    departamento;
    provincia;
    municipio;
    documentoIdentidad;
    nombreCompleto;
    fechaNacimiento;
    rol;
    tutor;
    competencia;
    creadoEn;
    actualizadoEn;
    miembrosEquipos;
    clasificaciones;
};
exports.Participante = Participante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_equipo', type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Participante.prototype, "nombreEquipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Participante.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Participante.prototype, "provincia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Participante.prototype, "municipio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'documento_identidad', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Participante.prototype, "documentoIdentidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_completo', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Participante.prototype, "nombreCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento', type: 'date' }),
    __metadata("design:type", Date)
], Participante.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'participante'
    }),
    __metadata("design:type", String)
], Participante.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tutor_entity_1.Tutor, tutor => tutor.participantes, { onDelete: 'SET NULL' }),
    __metadata("design:type", tutor_entity_1.Tutor)
], Participante.prototype, "tutor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, competencia => competencia.participantes, { onDelete: 'CASCADE' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], Participante.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Participante.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'actualizado_en',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Participante.prototype, "actualizadoEn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => miembros_equipo_entity_1.MiembroEquipo, miembroEquipo => miembroEquipo.participante),
    __metadata("design:type", Array)
], Participante.prototype, "miembrosEquipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clasificado_entity_1.Clasificado, clasificado => clasificado.participante),
    __metadata("design:type", Array)
], Participante.prototype, "clasificaciones", void 0);
exports.Participante = Participante = __decorate([
    (0, typeorm_1.Entity)('participantes')
], Participante);
//# sourceMappingURL=participante.entity.js.map