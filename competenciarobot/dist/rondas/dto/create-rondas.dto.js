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
exports.CreateRondaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRondaDto {
    fechaHora;
    pistaId;
    competenciaId;
    estado;
}
exports.CreateRondaDto = CreateRondaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01T10:00:00Z', description: 'Fecha y hora de la ronda' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRondaDto.prototype, "fechaHora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la pista asignada' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRondaDto.prototype, "pistaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la competencia' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRondaDto.prototype, "competenciaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pendiente', enum: ['pendiente', 'en_progreso', 'finalizada'] }),
    (0, class_validator_1.IsEnum)(['pendiente', 'en_progreso', 'finalizada']),
    __metadata("design:type", String)
], CreateRondaDto.prototype, "estado", void 0);
//# sourceMappingURL=create-rondas.dto.js.map