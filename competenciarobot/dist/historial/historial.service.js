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
exports.HistorialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historial_entity_1 = require("./entities/historial.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let HistorialService = class HistorialService {
    historialRepo;
    competenciaRepo;
    constructor(historialRepo, competenciaRepo) {
        this.historialRepo = historialRepo;
        this.competenciaRepo = competenciaRepo;
    }
    async create(dto) {
        let competencia = null;
        if (dto.competencia_id) {
            competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });
            if (!competencia)
                throw new common_1.NotFoundException('Competencia no encontrada');
        }
        const historial = this.historialRepo.create({
            ...dto,
            ...(competencia ? { competencia } : {}),
        });
        return this.historialRepo.save(historial);
    }
    findAll() {
        return this.historialRepo.find({ relations: ['competencia'] });
    }
    async findOne(id) {
        const historial = await this.historialRepo.findOne({ where: { id }, relations: ['competencia'] });
        if (!historial)
            throw new common_1.NotFoundException('Historial no encontrado');
        return historial;
    }
    async update(id, dto) {
        const historial = await this.findOne(id);
        Object.assign(historial, dto);
        if (dto.competencia_id) {
            const competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });
            if (!competencia)
                throw new common_1.NotFoundException('Competencia no encontrada');
            historial.competencia = competencia;
        }
        return this.historialRepo.save(historial);
    }
    async remove(id) {
        const historial = await this.findOne(id);
        await this.historialRepo.remove(historial);
        return { message: 'Historial eliminado correctamente' };
    }
};
exports.HistorialService = HistorialService;
exports.HistorialService = HistorialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historial_entity_1.HistorialCompetencia)),
    __param(1, (0, typeorm_1.InjectRepository)(competencia_entity_1.Competencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HistorialService);
//# sourceMappingURL=historial.service.js.map