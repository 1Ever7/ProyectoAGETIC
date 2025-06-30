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
exports.RondaEquiposService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ronda_equipos_entity_1 = require("./entities/ronda_equipos.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
let RondaEquiposService = class RondaEquiposService {
    rondaEquipoRepo;
    rondaRepo;
    equipoRepo;
    constructor(rondaEquipoRepo, rondaRepo, equipoRepo) {
        this.rondaEquipoRepo = rondaEquipoRepo;
        this.rondaRepo = rondaRepo;
        this.equipoRepo = equipoRepo;
    }
    async findAll(filterDto) {
        const { color, estadoRonda, numeroRonda } = filterDto || {};
        const query = this.rondaEquipoRepo
            .createQueryBuilder('rondaEquipo')
            .leftJoinAndSelect('rondaEquipo.ronda', 'ronda')
            .leftJoinAndSelect('rondaEquipo.equipo', 'equipo')
            .leftJoinAndSelect('equipo.miembros', 'miembro')
            .leftJoinAndSelect('miembro.participante', 'participante')
            .leftJoinAndSelect('ronda.pista', 'pista');
        if (color) {
            query.andWhere('equipo.color = :color', { color });
        }
        if (estadoRonda) {
            query.andWhere('ronda.estado = :estado', { estado: estadoRonda });
        }
        if (numeroRonda) {
            query.andWhere('ronda.numeroRonda = :numero', { numero: numeroRonda });
        }
        return query.getMany();
    }
};
exports.RondaEquiposService = RondaEquiposService;
exports.RondaEquiposService = RondaEquiposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ronda_equipos_entity_1.RondaEquipo)),
    __param(1, (0, typeorm_1.InjectRepository)(ronda_entity_1.Ronda)),
    __param(2, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RondaEquiposService);
//# sourceMappingURL=ronda_equipos.service.js.map