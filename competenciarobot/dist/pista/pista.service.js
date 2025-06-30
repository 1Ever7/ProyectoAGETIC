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
exports.PistasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pista_entity_1 = require("./entities/pista.entity");
let PistasService = class PistasService {
    pistaRepo;
    constructor(pistaRepo) {
        this.pistaRepo = pistaRepo;
    }
    async create(dto) {
        const pista = this.pistaRepo.create({
            nombre: dto.nombre,
            estado: dto.estado,
            competencia: { id: dto.competenciaId },
        });
        return this.pistaRepo.save(pista);
    }
    findAll() {
        return this.pistaRepo.find({ relations: ['competencia'] });
    }
    async findOne(id) {
        const pista = await this.pistaRepo.findOne({ where: { id }, relations: ['competencia'] });
        if (!pista)
            throw new common_1.NotFoundException(`Pista con id ${id} no encontrada`);
        return pista;
    }
    async update(id, dto) {
        const pista = await this.findOne(id);
        Object.assign(pista, dto);
        return this.pistaRepo.save(pista);
    }
    async remove(id) {
        const pista = await this.findOne(id);
        await this.pistaRepo.remove(pista);
        return { message: `Pista con id ${id} eliminada correctamente` };
    }
};
exports.PistasService = PistasService;
exports.PistasService = PistasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pista_entity_1.Pista)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PistasService);
//# sourceMappingURL=pista.service.js.map