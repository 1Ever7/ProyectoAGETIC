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
exports.MiembrosEquipoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const miembros_equipo_service_1 = require("./miembros_equipo.service");
const filter_miembros_equipo_dto_1 = require("./dto/filter-miembros_equipo.dto");
const miembros_equipo_entity_1 = require("./entities/miembros_equipo.entity");
let MiembrosEquipoController = class MiembrosEquipoController {
    miembrosEquipoService;
    constructor(miembrosEquipoService) {
        this.miembrosEquipoService = miembrosEquipoService;
    }
    findAll(filtro) {
        return this.miembrosEquipoService.findAll(filtro);
    }
    findOne(id) {
        return this.miembrosEquipoService.findOne(id);
    }
};
exports.MiembrosEquipoController = MiembrosEquipoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de miembros de equipos', type: [miembros_equipo_entity_1.MiembroEquipo] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No se encontraron miembros con los filtros dados' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_miembros_equipo_dto_1.FilterMiembroEquipoDto]),
    __metadata("design:returntype", void 0)
], MiembrosEquipoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Miembro encontrado por ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Miembro no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MiembrosEquipoController.prototype, "findOne", null);
exports.MiembrosEquipoController = MiembrosEquipoController = __decorate([
    (0, swagger_1.ApiTags)('Miembros Equipo'),
    (0, swagger_1.ApiBearerAuth)('bearer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('miembros-equipo'),
    __metadata("design:paramtypes", [miembros_equipo_service_1.MiembrosEquipoService])
], MiembrosEquipoController);
//# sourceMappingURL=miembros_equipo.controller.js.map