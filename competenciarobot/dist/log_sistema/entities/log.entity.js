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
exports.LogSistema = void 0;
const typeorm_1 = require("typeorm");
const usuarios_entity_1 = require("../../usuarios/entities/usuarios.entity");
let LogSistema = class LogSistema {
    id;
    usuario;
    accion;
    tablaAfectada;
    registroId;
    detalles;
    creadoEn;
};
exports.LogSistema = LogSistema;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogSistema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarios_entity_1.Usuario, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuarios_entity_1.Usuario)
], LogSistema.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], LogSistema.prototype, "accion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tabla_afectada', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], LogSistema.prototype, "tablaAfectada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registro_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], LogSistema.prototype, "registroId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], LogSistema.prototype, "detalles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creado_en', type: 'timestamp' }),
    __metadata("design:type", Date)
], LogSistema.prototype, "creadoEn", void 0);
exports.LogSistema = LogSistema = __decorate([
    (0, typeorm_1.Entity)('logs_sistema')
], LogSistema);
//# sourceMappingURL=log.entity.js.map