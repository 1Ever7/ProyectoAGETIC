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
exports.ParticipantesController = void 0;
const common_1 = require("@nestjs/common");
const participantes_service_1 = require("./participantes.service");
const create_participantes_dto_1 = require("./dto/create-participantes.dto");
const update_participantes_dto_1 = require("./dto/update-participantes.dto");
const filter_participanteDto_dto_1 = require("./dto/filter-participanteDto.dto");
let ParticipantesController = class ParticipantesController {
    participantesService;
    constructor(participantesService) {
        this.participantesService = participantesService;
    }
    create(createDto) {
        return this.participantesService.create(createDto);
    }
    findAll(filterDto) {
        return this.participantesService.findAll(filterDto);
    }
    findOne(id) {
        return this.participantesService.findOne(id);
    }
    update(id, updateDto) {
        return this.participantesService.update(id, updateDto);
    }
    remove(id) {
        return this.participantesService.remove(id);
    }
};
exports.ParticipantesController = ParticipantesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_participantes_dto_1.CreateParticipanteDto]),
    __metadata("design:returntype", void 0)
], ParticipantesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_participanteDto_dto_1.FilterParticipantesDto]),
    __metadata("design:returntype", void 0)
], ParticipantesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipantesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_participantes_dto_1.UpdateParticipanteDto]),
    __metadata("design:returntype", void 0)
], ParticipantesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipantesController.prototype, "remove", null);
exports.ParticipantesController = ParticipantesController = __decorate([
    (0, common_1.Controller)('participantes'),
    __metadata("design:paramtypes", [participantes_service_1.ParticipantesService])
], ParticipantesController);
//# sourceMappingURL=participantes.controller.js.map