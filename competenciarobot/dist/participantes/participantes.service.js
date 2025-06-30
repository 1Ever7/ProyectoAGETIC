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
exports.ParticipantesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participante_entity_1 = require("./entities/participante.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
const enums_1 = require("../common/enums");
let ParticipantesService = class ParticipantesService {
    participanteRepo;
    competenciaRepo;
    constructor(participanteRepo, competenciaRepo) {
        this.participanteRepo = participanteRepo;
        this.competenciaRepo = competenciaRepo;
    }
    async create(dto) {
        const competencia = await this.competenciaRepo.findOne({
            where: { id: dto.competencia_id },
            relations: ['participantes'],
        });
        if (!competencia) {
            throw new common_1.NotFoundException('Competencia no encontrada');
        }
        if (competencia.estado !== enums_1.EstadoCompetencia.NO_INICIADA) {
            throw new common_1.BadRequestException('No se puede modificar cuando la competencia ya inició.');
        }
        const existe = await this.participanteRepo.findOne({
            where: { nombreEquipo: dto.nombre_equipo },
        });
        if (existe)
            throw new common_1.BadRequestException('El nombre de equipo ya está registrado');
        const participante = this.participanteRepo.create({
            ...dto,
            competencia,
        });
        return this.participanteRepo.save(participante);
    }
    async findAll(filter) {
        const where = {};
        if (filter.documentoIdentidad) {
            where.documentoIdentidad = (0, typeorm_2.Like)(`%${filter.documentoIdentidad}%`);
        }
        if (filter.departamento) {
            where.departamento = (0, typeorm_2.Like)(`%${filter.departamento}%`);
        }
        if (filter.provincia) {
            where.provincia = (0, typeorm_2.Like)(`%${filter.provincia}%`);
        }
        if (filter.municipio) {
            where.municipio = (0, typeorm_2.Like)(`%${filter.municipio}%`);
        }
        return this.participanteRepo.find({
            where,
            relations: ['tutor', 'competencia'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const participante = await this.participanteRepo.findOne({ where: { id }, relations: ['tutor', 'competencia'] });
        if (!participante)
            throw new common_1.NotFoundException('Participante no encontrado');
        return participante;
    }
    async update(id, dto) {
        await this.participanteRepo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        const participante = await this.participanteRepo.findOneBy({ id });
        if (!participante) {
            throw new common_1.NotFoundException(`Participante con id ${id} no encontrado`);
        }
        await this.participanteRepo.remove(participante);
        return { message: `Participante con id ${id} eliminado correctamente` };
    }
};
exports.ParticipantesService = ParticipantesService;
exports.ParticipantesService = ParticipantesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participante_entity_1.Participante)),
    __param(1, (0, typeorm_1.InjectRepository)(competencia_entity_1.Competencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ParticipantesService);
//# sourceMappingURL=participantes.service.js.map