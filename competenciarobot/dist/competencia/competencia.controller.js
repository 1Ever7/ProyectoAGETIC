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
exports.CompetenciaController = void 0;
const common_1 = require("@nestjs/common");
const competencia_service_1 = require("./competencia.service");
const create_competencia_dto_1 = require("./dto/create-competencia.dto");
const update_competencia_dto_1 = require("./dto/update-competencia.dto");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CompetenciaController = class CompetenciaController {
    competenciaService;
    constructor(competenciaService) {
        this.competenciaService = competenciaService;
    }
    create(dto) {
        return this.competenciaService.create(dto);
    }
    findAll() {
        return this.competenciaService.findAll();
    }
    findOne(id) {
        return this.competenciaService.findOne(id);
    }
    update(id, dto) {
        return this.competenciaService.update(id, dto);
    }
    async remove(id) {
        await this.competenciaService.remove(id);
    }
    async generarRondas(id) {
        const data = await this.competenciaService.generarRondas(id);
        return {
            message: 'Rondas y equipos generados correctamente.',
            data,
        };
    }
    async iniciar(id) {
        const data = await this.competenciaService.iniciarCompetencia(id);
        return { message: 'Competencia iniciada', data };
    }
    finalizarCompetencia(id) {
        return this.competenciaService.finalizarCompetencia(+id);
    }
    async iniciarRonda(rondaId) {
        const data = await this.competenciaService.iniciarRonda(rondaId);
        return { message: 'Ronda iniciada', data };
    }
    async finalizarRonda(rondaId) {
        const data = await this.competenciaService.finalizarRonda(rondaId);
        return { message: 'Ronda finalizada', data };
    }
};
exports.CompetenciaController = CompetenciaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Competencia creada exitosamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_competencia_dto_1.CreateCompetenciaDto]),
    __metadata("design:returntype", void 0)
], CompetenciaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de competencias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompetenciaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Competencia encontrada' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Competencia no encontrada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompetenciaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Competencia actualizada' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Competencia no encontrada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_competencia_dto_1.UpdateCompetenciaDto]),
    __metadata("design:returntype", void 0)
], CompetenciaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOkResponse)({ description: 'Competencia eliminada' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Competencia no encontrada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompetenciaController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/generar-rondas'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompetenciaController.prototype, "generarRondas", null);
__decorate([
    (0, common_1.Post)(':id/iniciar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompetenciaController.prototype, "iniciar", null);
__decorate([
    (0, common_1.Post)(':id/finalizar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompetenciaController.prototype, "finalizarCompetencia", null);
__decorate([
    (0, common_1.Post)('ronda/:rondaId/iniciar'),
    __param(0, (0, common_1.Param)('rondaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompetenciaController.prototype, "iniciarRonda", null);
__decorate([
    (0, common_1.Post)('ronda/:rondaId/finalizar'),
    __param(0, (0, common_1.Param)('rondaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompetenciaController.prototype, "finalizarRonda", null);
exports.CompetenciaController = CompetenciaController = __decorate([
    (0, swagger_1.ApiTags)('Competencia'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('competencia'),
    __metadata("design:paramtypes", [competencia_service_1.CompetenciaService])
], CompetenciaController);
//# sourceMappingURL=competencia.controller.js.map