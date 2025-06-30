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
exports.MiembrosEquipoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const miembros_equipo_entity_1 = require("./entities/miembros_equipo.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
let MiembrosEquipoService = class MiembrosEquipoService {
    miembroRepo;
    equipoRepo;
    participanteRepo;
    constructor(miembroRepo, equipoRepo, participanteRepo) {
        this.miembroRepo = miembroRepo;
        this.equipoRepo = equipoRepo;
        this.participanteRepo = participanteRepo;
    }
    async findAll(filterDto) {
        const { nombreParticipante, colorEquipo } = filterDto || {};
        const query = this.miembroRepo
            .createQueryBuilder('miembro')
            .leftJoinAndSelect('miembro.equipo', 'equipo')
            .leftJoinAndSelect('miembro.participante', 'participante');
        if (colorEquipo) {
            query.andWhere('equipo.color = :color', { color: colorEquipo });
        }
        if (nombreParticipante) {
            query.andWhere('LOWER(participante.nombre) LIKE LOWER(:nombre)', {
                nombre: `%${nombreParticipante}%`,
            });
        }
        return query.getMany();
    }
    async findOne(id) {
        const miembro = await this.miembroRepo.findOne({
            where: { id },
            relations: ['equipo', 'participante'],
        });
        if (!miembro)
            throw new common_1.NotFoundException('Miembro no encontrado');
        return miembro;
    }
};
exports.MiembrosEquipoService = MiembrosEquipoService;
exports.MiembrosEquipoService = MiembrosEquipoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(miembros_equipo_entity_1.MiembroEquipo)),
    __param(1, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(2, (0, typeorm_1.InjectRepository)(participante_entity_1.Participante)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MiembrosEquipoService);
//# sourceMappingURL=miembros_equipo.service.js.map