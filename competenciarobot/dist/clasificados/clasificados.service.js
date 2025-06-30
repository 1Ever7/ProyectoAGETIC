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
exports.ClasificadosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clasificado_entity_1 = require("./entities/clasificado.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
const competencia_entity_1 = require("../competencia/entities/competencia.entity");
let ClasificadosService = class ClasificadosService {
    clasificadoRepo;
    participanteRepo;
    competenciaRepo;
    constructor(clasificadoRepo, participanteRepo, competenciaRepo) {
        this.clasificadoRepo = clasificadoRepo;
        this.participanteRepo = participanteRepo;
        this.competenciaRepo = competenciaRepo;
    }
    async create(dto) {
        const participante = await this.participanteRepo.findOneBy({ id: dto.participante_id });
        const competencia = await this.competenciaRepo.findOneBy({ id: dto.competencia_id });
        if (!participante || !competencia) {
            throw new common_1.NotFoundException('Participante o competencia no encontrado');
        }
        const clasificado = this.clasificadoRepo.create({
            participante,
            competencia,
            posicion: dto.posicion,
            puntajeTotal: dto.puntaje_total,
        });
        return this.clasificadoRepo.save(clasificado);
    }
    findAll() {
        return this.clasificadoRepo.find({ relations: ['participante', 'competencia'] });
    }
    async findOne(id) {
        const clasificado = await this.clasificadoRepo.findOne({
            where: { id },
            relations: ['participante', 'competencia'],
        });
        if (!clasificado)
            throw new common_1.NotFoundException('Clasificado no encontrado');
        return clasificado;
    }
    async update(id, dto) {
        const clasificado = await this.findOne(id);
        Object.assign(clasificado, {
            posicion: dto.posicion ?? clasificado.posicion,
            puntajeTotal: dto.puntaje_total ?? clasificado.puntajeTotal,
        });
        return this.clasificadoRepo.save(clasificado);
    }
    async remove(id) {
        const clasificado = await this.findOne(id);
        await this.clasificadoRepo.remove(clasificado);
        return { message: 'Clasificado eliminado correctamente' };
    }
};
exports.ClasificadosService = ClasificadosService;
exports.ClasificadosService = ClasificadosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clasificado_entity_1.Clasificado)),
    __param(1, (0, typeorm_1.InjectRepository)(participante_entity_1.Participante)),
    __param(2, (0, typeorm_1.InjectRepository)(competencia_entity_1.Competencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClasificadosService);
//# sourceMappingURL=clasificados.service.js.map