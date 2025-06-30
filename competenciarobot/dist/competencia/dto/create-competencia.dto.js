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
exports.CreateCompetenciaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCompetenciaDto {
    nombre;
    descripcion;
    fecha_inicio;
    fecha_fin;
    numero_clasificados;
    estado;
}
exports.CreateCompetenciaDto = CreateCompetenciaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Competencia Nacional de Sumo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompetenciaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Competencia regional de robótica sumo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompetenciaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-01T10:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateCompetenciaDto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-03T18:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateCompetenciaDto.prototype, "fecha_fin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Número de clasificados (por defecto: 3)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCompetenciaDto.prototype, "numero_clasificados", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'configuracion', enum: ['configuracion', 'en_progreso', 'finalizada'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['configuracion', 'en_progreso', 'finalizada']),
    __metadata("design:type", String)
], CreateCompetenciaDto.prototype, "estado", void 0);
//# sourceMappingURL=create-competencia.dto.js.map