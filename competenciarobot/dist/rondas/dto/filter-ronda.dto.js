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
exports.FilterRondaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class FilterRondaDto {
    estado;
    competenciaId;
    pistaId;
    fecha;
}
exports.FilterRondaDto = FilterRondaDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estado de la ronda', enum: ['pendiente', 'en_curso', 'finalizada'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['pendiente', 'en_curso', 'finalizada']),
    __metadata("design:type", String)
], FilterRondaDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la competencia' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterRondaDto.prototype, "competenciaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la pista' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FilterRondaDto.prototype, "pistaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha exacta (yyyy-mm-dd)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FilterRondaDto.prototype, "fecha", void 0);
//# sourceMappingURL=filter-ronda.dto.js.map