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
exports.RondaEquiposController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const ronda_equipos_service_1 = require("./ronda_equipos.service");
const filter_ronda_equipos_dto_1 = require("./dto/filter-ronda_equipos.dto");
const ronda_equipos_entity_1 = require("./entities/ronda_equipos.entity");
let RondaEquiposController = class RondaEquiposController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(filtro) {
        return this.service.findAll(filtro);
    }
};
exports.RondaEquiposController = RondaEquiposController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de rondas con equipos', type: [ronda_equipos_entity_1.RondaEquipo] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No se encontraron rondas con equipos' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_ronda_equipos_dto_1.FilterRondaEquipoDto]),
    __metadata("design:returntype", void 0)
], RondaEquiposController.prototype, "findAll", null);
exports.RondaEquiposController = RondaEquiposController = __decorate([
    (0, swagger_1.ApiTags)('Ronda Equipos'),
    (0, swagger_1.ApiBearerAuth)('bearer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ronda-equipos'),
    __metadata("design:paramtypes", [ronda_equipos_service_1.RondaEquiposService])
], RondaEquiposController);
//# sourceMappingURL=ronda_equipos.controller.js.map