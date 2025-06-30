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
exports.Tutor = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participantes/entities/participante.entity");
let Tutor = class Tutor {
    id;
    documentoIdentidad;
    nombreCompleto;
    telefono;
    email;
    creadoEn;
    actualizadoEn;
    participantes;
};
exports.Tutor = Tutor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tutor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'documento_identidad', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Tutor.prototype, "documentoIdentidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_completo', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Tutor.prototype, "nombreCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Tutor.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Tutor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Tutor.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'actualizado_en',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Tutor.prototype, "actualizadoEn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participante_entity_1.Participante, participante => participante.tutor),
    __metadata("design:type", Array)
], Tutor.prototype, "participantes", void 0);
exports.Tutor = Tutor = __decorate([
    (0, typeorm_1.Entity)('tutores')
], Tutor);
//# sourceMappingURL=tutor.entity.js.map