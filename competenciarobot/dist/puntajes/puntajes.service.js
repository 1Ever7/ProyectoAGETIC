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
exports.PuntajesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const puntaje_entity_1 = require("./entities/puntaje.entity");
const ronda_equipos_entity_1 = require("../ronda_equipos/entities/ronda_equipos.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
let PuntajesService = class PuntajesService {
    puntajeRepo;
    rondaEquipoRepo;
    rondaRepo;
    constructor(puntajeRepo, rondaEquipoRepo, rondaRepo) {
        this.puntajeRepo = puntajeRepo;
        this.rondaEquipoRepo = rondaEquipoRepo;
        this.rondaRepo = rondaRepo;
    }
    async create(dto) {
        const ronda = await this.rondaRepo.findOneBy({ id: dto.ronda_id });
        const equipo = await this.rondaEquipoRepo.findOneBy({ id: dto.equipo_id });
        if (!ronda || !equipo)
            throw new common_1.NotFoundException('Ronda o equipo no encontrado');
        const existe = await this.puntajeRepo.findOne({ where: { ronda, equipo } });
        if (existe)
            throw new common_1.BadRequestException('Ya existe un puntaje para esta ronda y equipo');
        const puntaje = this.puntajeRepo.create({ ...dto, ronda, equipo });
        return this.puntajeRepo.save(puntaje);
    }
    findAll() {
        return this.puntajeRepo.find({ relations: ['ronda', 'equipo'] });
    }
    async findOne(id) {
        const puntaje = await this.puntajeRepo.findOne({ where: { id }, relations: ['ronda', 'equipo'] });
        if (!puntaje)
            throw new common_1.NotFoundException('Puntaje no encontrado');
        return puntaje;
    }
    async update(id, dto) {
        const puntaje = await this.findOne(id);
        Object.assign(puntaje, dto);
        return this.puntajeRepo.save(puntaje);
    }
    async remove(id) {
        const puntaje = await this.findOne(id);
        await this.puntajeRepo.remove(puntaje);
        return { message: 'Puntaje eliminado correctamente' };
    }
};
exports.PuntajesService = PuntajesService;
exports.PuntajesService = PuntajesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(puntaje_entity_1.Puntaje)),
    __param(1, (0, typeorm_1.InjectRepository)(ronda_equipos_entity_1.RondaEquipo)),
    __param(2, (0, typeorm_1.InjectRepository)(ronda_entity_1.Ronda)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PuntajesService);
//# sourceMappingURL=puntajes.service.js.map