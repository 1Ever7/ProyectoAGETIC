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
exports.TutoresController = void 0;
const common_1 = require("@nestjs/common");
const tutores_service_1 = require("./tutores.service");
const create_tutor_dto_1 = require("./dto/create-tutor.dto");
const update_tutores_dto_1 = require("./dto/update-tutores.dto");
const filter_tutor_dto_1 = require("./dto/filter-tutor.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
let TutoresController = class TutoresController {
    tutoresService;
    constructor(tutoresService) {
        this.tutoresService = tutoresService;
    }
    async create(dto) {
        try {
            return await this.tutoresService.create(dto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(filterDto) {
        return await this.tutoresService.findAll(filterDto);
    }
    async findOne(id) {
        const tutor = await this.tutoresService.findOne(+id);
        if (!tutor) {
            throw new common_1.NotFoundException(`Tutor con id ${id} no encontrado`);
        }
        return tutor;
    }
    async update(id, dto) {
        const updated = await this.tutoresService.update(+id, dto);
        if (!updated) {
            throw new common_1.NotFoundException(`Tutor con id ${id} no encontrado`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.tutoresService.remove(+id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Tutor con id ${id} no encontrado`);
        }
        return deleted;
    }
};
exports.TutoresController = TutoresController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Tutor creado correctamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tutor_dto_1.CreateTutorDto]),
    __metadata("design:returntype", Promise)
], TutoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de tutores' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_tutor_dto_1.FilterTutorDto]),
    __metadata("design:returntype", Promise)
], TutoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Tutor encontrado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Tutor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Tutor actualizado correctamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Tutor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tutores_dto_1.UpdateTutorDto]),
    __metadata("design:returntype", Promise)
], TutoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Tutor eliminado correctamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Tutor no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TutoresController.prototype, "remove", null);
exports.TutoresController = TutoresController = __decorate([
    (0, swagger_1.ApiTags)('Tutores'),
    (0, swagger_1.ApiBearerAuth)('bearer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tutores'),
    __metadata("design:paramtypes", [tutores_service_1.TutoresService])
], TutoresController);
//# sourceMappingURL=tutores.controller.js.map