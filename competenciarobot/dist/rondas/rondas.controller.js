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
exports.RondasController = void 0;
const common_1 = require("@nestjs/common");
const rondas_service_1 = require("./rondas.service");
const create_rondas_dto_1 = require("./dto/create-rondas.dto");
const update_rondas_dto_1 = require("./dto/update-rondas.dto");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let RondasController = class RondasController {
    rondasService;
    constructor(rondasService) {
        this.rondasService = rondasService;
    }
    async create(dto) {
        return this.rondasService.create(dto);
    }
    async findAll() {
        return this.rondasService.findAll();
    }
    async findOne(id) {
        return this.rondasService.findOne(+id);
    }
    async update(id, dto) {
        return this.rondasService.update(+id, dto);
    }
    async remove(id) {
        return this.rondasService.remove(+id);
    }
};
exports.RondasController = RondasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Ronda creada correctamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rondas_dto_1.CreateRondaDto]),
    __metadata("design:returntype", Promise)
], RondasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de rondas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RondasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Ronda encontrada' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Ronda no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RondasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Ronda actualizada correctamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Ronda no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rondas_dto_1.UpdateRondaDto]),
    __metadata("design:returntype", Promise)
], RondasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Ronda eliminada correctamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Ronda no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RondasController.prototype, "remove", null);
exports.RondasController = RondasController = __decorate([
    (0, swagger_1.ApiTags)('Rondas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('rondas'),
    __metadata("design:paramtypes", [rondas_service_1.RondasService])
], RondasController);
//# sourceMappingURL=rondas.controller.js.map