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
exports.EquiposService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipo_entity_1 = require("./entities/equipo.entity");
let EquiposService = class EquiposService {
    equipoRepo;
    constructor(equipoRepo) {
        this.equipoRepo = equipoRepo;
    }
    async create(dto) {
        const equipo = this.equipoRepo.create(dto);
        return this.equipoRepo.save(equipo);
    }
    async findOne(id) {
        const equipo = await this.equipoRepo.findOne({
            where: { id },
            relations: ['miembros', 'rondas', 'puntajes'],
        });
        if (!equipo)
            throw new common_1.NotFoundException('Equipo no encontrado');
        return equipo;
    }
    async update(id, dto) {
        await this.equipoRepo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        const equipo = await this.findOne(id);
        await this.equipoRepo.remove(equipo);
        return { message: 'Equipo eliminado correctamente' };
    }
    async findAll(filterDto) {
        const query = this.equipoRepo.createQueryBuilder('equipo');
        if (filterDto?.color) {
            query.andWhere('equipo.color = :color', { color: filterDto.color });
        }
        return await query.getMany();
    }
};
exports.EquiposService = EquiposService;
exports.EquiposService = EquiposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquiposService);
//# sourceMappingURL=equipos.service.js.map