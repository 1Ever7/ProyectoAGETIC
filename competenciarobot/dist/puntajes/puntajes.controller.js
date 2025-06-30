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
exports.PuntajesController = void 0;
const common_1 = require("@nestjs/common");
const puntajes_service_1 = require("./puntajes.service");
const create_puntajes_dto_1 = require("./dto/create-puntajes.dto");
const update_puntajes_dto_1 = require("./dto/update-puntajes.dto");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let PuntajesController = class PuntajesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(+id);
    }
    update(id, dto) {
        return this.service.update(+id, dto);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.PuntajesController = PuntajesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Puntaje creado correctamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_puntajes_dto_1.CreatePuntajeDto]),
    __metadata("design:returntype", Promise)
], PuntajesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de puntajes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PuntajesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Puntaje encontrado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Puntaje no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PuntajesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Puntaje actualizado correctamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_puntajes_dto_1.UpdatePuntajeDto]),
    __metadata("design:returntype", void 0)
], PuntajesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Puntaje eliminado correctamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PuntajesController.prototype, "remove", null);
exports.PuntajesController = PuntajesController = __decorate([
    (0, swagger_1.ApiTags)('Puntajes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('puntajes'),
    __metadata("design:paramtypes", [puntajes_service_1.PuntajesService])
], PuntajesController);
//# sourceMappingURL=puntajes.controller.js.map