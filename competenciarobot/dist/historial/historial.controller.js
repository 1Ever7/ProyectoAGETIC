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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialController = void 0;
const common_1 = require("@nestjs/common");
const historial_service_1 = require("./historial.service");
const create_historial_dto_1 = require("./dto/create-historial.dto");
const update_historial_dto_1 = require("./dto/update-historial.dto");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let HistorialController = class HistorialController {
    historialService;
    constructor(historialService) {
        this.historialService = historialService;
    }
    async create(dto) {
        try {
            return await this.historialService.create(dto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll() {
        return this.historialService.findAll();
    }
    async findOne(id) {
        return await this.historialService.findOne(+id);
    }
    async update(id, dto) {
        try {
            return await this.historialService.update(+id, dto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(id) {
        return await this.historialService.remove(+id);
    }
};
exports.HistorialController = HistorialController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Historial de competencia creado correctamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_historial_dto_1.CreateHistorialDto]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de historiales' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HistorialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Historial encontrado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Historial no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Historial actualizado correctamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Historial no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_historial_dto_1.UpdateHistorialDto]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Historial eliminado correctamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "remove", null);
exports.HistorialController = HistorialController = __decorate([
    (0, swagger_1.ApiTags)('Historial Competencias'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('historial-competencias'),
    __metadata("design:paramtypes", [historial_service_1.HistorialService])
], HistorialController);
//# sourceMappingURL=historial.controller.js.map