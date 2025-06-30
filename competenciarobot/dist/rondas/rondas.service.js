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
exports.RondasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ronda_entity_1 = require("./entities/ronda.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let RondasService = class RondasService {
    rondaRepo;
    competenciaRepo;
    constructor(rondaRepo, competenciaRepo) {
        this.rondaRepo = rondaRepo;
        this.competenciaRepo = competenciaRepo;
    }
    async create(dto) {
        const competencia = await this.competenciaRepo.findOne({ where: { id: dto.competenciaId } });
        if (competencia?.estado !== 'configuracion') {
            throw new common_1.BadRequestException('No se puede modificar esta entidad una vez iniciada la competencia.');
        }
        const ronda = this.rondaRepo.create(dto);
        return this.rondaRepo.save(ronda);
    }
    findAll() {
        return this.rondaRepo.find({ relations: ['pista', 'competencia'] });
    }
    async findOne(id) {
        const ronda = await this.rondaRepo.findOne({ where: { id }, relations: ['pista', 'competencia'] });
        if (!ronda)
            throw new common_1.NotFoundException(`Ronda con id ${id} no encontrada`);
        return ronda;
    }
    async update(id, dto) {
        await this.rondaRepo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        const ronda = await this.rondaRepo.findOneBy({ id });
        if (!ronda)
            throw new common_1.NotFoundException(`Ronda con id ${id} no encontrada`);
        await this.rondaRepo.remove(ronda);
        return { message: `Ronda con id ${id} eliminada correctamente` };
    }
};
exports.RondasService = RondasService;
exports.RondasService = RondasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ronda_entity_1.Ronda)),
    __param(1, (0, typeorm_1.InjectRepository)(competencia_entity_1.Competencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RondasService);
//# sourceMappingURL=rondas.service.js.map