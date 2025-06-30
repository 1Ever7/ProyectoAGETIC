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
exports.FilterRondaEquipoDto = exports.ColorEquipo = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ColorEquipo;
(function (ColorEquipo) {
    ColorEquipo["ROJO"] = "rojo";
    ColorEquipo["AZUL"] = "azul";
})(ColorEquipo || (exports.ColorEquipo = ColorEquipo = {}));
class FilterRondaEquipoDto {
    color;
    estadoRonda;
    numeroRonda;
}
exports.FilterRondaEquipoDto = FilterRondaEquipoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Color del equipo', enum: ColorEquipo }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ColorEquipo),
    __metadata("design:type", String)
], FilterRondaEquipoDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estado de la ronda' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterRondaEquipoDto.prototype, "estadoRonda", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Número de ronda' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FilterRondaEquipoDto.prototype, "numeroRonda", void 0);
//# sourceMappingURL=filter-ronda_equipos.dto.js.map