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
exports.EquiposController = void 0;
const common_1 = require("@nestjs/common");
const equipos_service_1 = require("./equipos.service");
const create_equipo_dto_1 = require("./dto/create-equipo.dto");
const update_equipo_dto_1 = require("./dto/update-equipo.dto");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const filter_equipo_dto_1 = require("./dto/filter-equipo.dto");
const response_equipo_dto_1 = require("./dto/response-equipo.dto");
const common_2 = require("@nestjs/common");
let EquiposController = class EquiposController {
    equiposService;
    constructor(equiposService) {
        this.equiposService = equiposService;
    }
    create(dto) {
        return this.equiposService.create(dto);
    }
    async findAll(filterDto) {
        const equipos = await this.equiposService.findAll(filterDto);
        return equipos.map(e => ({
            id: e.id,
            color: e.color,
            creado_en: e.creado_en,
            actualizado_en: e.actualizado_en,
        }));
    }
    findOne(id) {
        return this.equiposService.findOne(+id);
    }
    update(id, dto) {
        return this.equiposService.update(+id, dto);
    }
    remove(id) {
        return this.equiposService.remove(+id);
    }
};
exports.EquiposController = EquiposController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Equipo creado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipo_dto_1.CreateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de equipos', type: [response_equipo_dto_1.EquipoResponseDto] }),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_equipo_dto_1.FilterEquipoDto]),
    __metadata("design:returntype", Promise)
], EquiposController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Equipo encontrado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Equipo actualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipo_dto_1.UpdateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Equipo eliminado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "remove", null);
exports.EquiposController = EquiposController = __decorate([
    (0, swagger_1.ApiTags)('Equipos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('equipos'),
    __metadata("design:paramtypes", [equipos_service_1.EquiposService])
], EquiposController);
//# sourceMappingURL=equipos.controller.js.map