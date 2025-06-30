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
exports.CompetenciaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const competencia_entity_1 = require("./entities/competencia.entity");
const participante_entity_1 = require("../participantes/entities/participante.entity");
const ronda_entity_1 = require("../rondas/entities/ronda.entity");
const equipo_entity_1 = require("../equipos/entities/equipo.entity");
const miembros_equipo_entity_1 = require("../miembros_equipo/entities/miembros_equipo.entity");
const ronda_equipos_entity_1 = require("../ronda_equipos/entities/ronda_equipos.entity");
const pista_entity_1 = require("../pista/entities/pista.entity");
const clasificado_entity_1 = require("../clasificados/entities/clasificado.entity");
const puntaje_entity_1 = require("../puntajes/entities/puntaje.entity");
const enums_1 = require("../common/enums");
let CompetenciaService = class CompetenciaService {
    competenciaRepo;
    participanteRepo;
    rondaRepo;
    equipoRepo;
    miembroRepo;
    rondaEquipoRepo;
    pistaRepo;
    clasificadoRepo;
    puntajeRepo;
    constructor(competenciaRepo, participanteRepo, rondaRepo, equipoRepo, miembroRepo, rondaEquipoRepo, pistaRepo, clasificadoRepo, puntajeRepo) {
        this.competenciaRepo = competenciaRepo;
        this.participanteRepo = participanteRepo;
        this.rondaRepo = rondaRepo;
        this.equipoRepo = equipoRepo;
        this.miembroRepo = miembroRepo;
        this.rondaEquipoRepo = rondaEquipoRepo;
        this.pistaRepo = pistaRepo;
        this.clasificadoRepo = clasificadoRepo;
        this.puntajeRepo = puntajeRepo;
    }
    async create(dto) {
        try {
            const competencia = this.competenciaRepo.create(dto);
            return await this.competenciaRepo.save(competencia);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear la competencia');
        }
    }
    async findAll() {
        try {
            return await this.competenciaRepo.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al obtener las competencias');
        }
    }
    async findOne(id) {
        const competencia = await this.competenciaRepo.findOne({ where: { id } });
        if (!competencia)
            throw new common_1.NotFoundException('Competencia no encontrada');
        return competencia;
    }
    async update(id, dto) {
        const competencia = await this.findOne(id);
        try {
            this.competenciaRepo.merge(competencia, dto);
            return await this.competenciaRepo.save(competencia);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al actualizar la competencia');
        }
    }
    async remove(id) {
        const competencia = await this.findOne(id);
        if (competencia.estado !== enums_1.EstadoCompetencia.NO_INICIADA) {
            throw new common_1.BadRequestException('No se puede eliminar una competencia en progreso o finalizada');
        }
        try {
            await this.competenciaRepo.remove(competencia);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al eliminar la competencia');
        }
    }
    async iniciarCompetencia(id) {
        const competencia = await this.findOne(id);
        if (competencia.estado !== enums_1.EstadoCompetencia.NO_INICIADA) {
            throw new common_1.BadRequestException('Solo se puede iniciar competencia en estado configuración');
        }
        const participantes = await this.participanteRepo.find({
            where: { competencia: { id } },
        });
        if (participantes.length < 4) {
            throw new common_1.BadRequestException('Se requieren al menos 4 participantes para iniciar la competencia');
        }
        competencia.estado = enums_1.EstadoCompetencia.EN_PROGRESO;
        return this.competenciaRepo.save(competencia);
    }
    async finalizarCompetencia(id) {
        const competencia = await this.findOne(id);
        if (competencia.estado === enums_1.EstadoCompetencia.FINALIZADA) {
            throw new common_1.BadRequestException('La competencia ya fue finalizada');
        }
        const rondasEnCurso = await this.rondaRepo.count({
            where: {
                competencia: { id },
                estado: enums_1.EstadoRonda.EN_PROGRESO,
            },
        });
        const rondasPendientes = await this.rondaRepo.count({
            where: {
                competencia: { id },
                estado: enums_1.EstadoRonda.PENDIENTE,
            },
        });
        if (rondasEnCurso > 0 || rondasPendientes > 0) {
            throw new common_1.BadRequestException('No se puede finalizar la competencia mientras existan rondas activas o pendientes');
        }
        await this.generarClasificados(id);
        competencia.estado = enums_1.EstadoCompetencia.FINALIZADA;
        return this.competenciaRepo.save(competencia);
    }
    async generarRondas(competenciaId) {
        const competencia = await this.competenciaRepo.findOne({
            where: { id: competenciaId },
            relations: ['pistas'],
        });
        if (!competencia)
            throw new common_1.NotFoundException('Competencia no encontrada');
        if (competencia.estado !== enums_1.EstadoCompetencia.NO_INICIADA) {
            throw new common_1.BadRequestException('No se pueden generar rondas si la competencia ya inició');
        }
        const participantes = await this.participanteRepo.find({
            where: { competencia: { id: competenciaId } },
            relations: ['tutor'],
            order: { id: 'ASC' },
        });
        if (participantes.length < 4)
            throw new common_1.BadRequestException('Se requieren al menos 4 participantes para generar rondas.');
        const pistas = await this.pistaRepo.find({ where: { competencia: { id: competenciaId } } });
        if (!pistas.length)
            throw new common_1.BadRequestException('No hay pistas disponibles para la competencia.');
        const equipos = [];
        const participantesUsados = new Set();
        for (let i = 0; i < participantes.length; i++) {
            for (let j = i + 1; j < participantes.length; j++) {
                const p1 = participantes[i];
                const p2 = participantes[j];
                if (p1.tutor?.id !== p2.tutor?.id &&
                    !participantesUsados.has(p1.id) &&
                    !participantesUsados.has(p2.id)) {
                    const color = equipos.length % 2 === 0 ? 'rojo' : 'azul';
                    const equipo = this.equipoRepo.create({ color });
                    await this.equipoRepo.save(equipo);
                    const miembro1 = this.miembroRepo.create({ participante: p1, equipo });
                    const miembro2 = this.miembroRepo.create({ participante: p2, equipo });
                    await this.miembroRepo.save([miembro1, miembro2]);
                    equipos.push(equipo);
                    participantesUsados.add(p1.id);
                    participantesUsados.add(p2.id);
                    break;
                }
            }
        }
        if (equipos.length < 2)
            throw new common_1.BadRequestException('No se pudieron formar equipos suficientes.');
        const rondasNecesarias = Math.ceil((participantes.length / 2) / pistas.length);
        const rondas = [];
        let equipoIndex = 0;
        for (let i = 0; i < rondasNecesarias; i++) {
            for (const pista of pistas) {
                if (equipoIndex + 1 >= equipos.length)
                    break;
                const ronda = this.rondaRepo.create({
                    numeroRonda: i + 1,
                    pista,
                    competencia,
                    estado: enums_1.EstadoRonda.PENDIENTE,
                });
                await this.rondaRepo.save(ronda);
                const rondaEquipo1 = this.rondaEquipoRepo.create({ ronda, equipo: equipos[equipoIndex++] });
                const rondaEquipo2 = this.rondaEquipoRepo.create({ ronda, equipo: equipos[equipoIndex++] });
                await this.rondaEquipoRepo.save([rondaEquipo1, rondaEquipo2]);
                rondas.push(ronda);
            }
        }
        return rondas;
    }
    async iniciarRonda(rondaId) {
        const ronda = await this.rondaRepo.findOne({
            where: { id: rondaId },
            relations: ['pista', 'competencia'],
        });
        if (!ronda)
            throw new common_1.NotFoundException('Ronda no encontrada');
        if (ronda.estado !== enums_1.EstadoRonda.PENDIENTE) {
            throw new common_1.BadRequestException('La ronda ya fue iniciada o finalizada');
        }
        if (ronda.competencia.estado !== enums_1.EstadoCompetencia.EN_PROGRESO) {
            throw new common_1.BadRequestException('La competencia no está en progreso');
        }
        ronda.pista.estado = enums_1.EstadoPista.EN_USO;
        await this.pistaRepo.save(ronda.pista);
        ronda.estado = enums_1.EstadoRonda.EN_PROGRESO;
        return this.rondaRepo.save(ronda);
    }
    async finalizarRonda(rondaId) {
        const ronda = await this.rondaRepo.findOne({
            where: { id: rondaId },
            relations: ['pista'],
        });
        if (!ronda)
            throw new common_1.NotFoundException('Ronda no encontrada');
        if (ronda.estado !== enums_1.EstadoRonda.EN_PROGRESO) {
            throw new common_1.BadRequestException('La ronda no está en progreso');
        }
        ronda.pista.estado = enums_1.EstadoPista.DISPONIBLE;
        await this.pistaRepo.save(ronda.pista);
        ronda.estado = enums_1.EstadoRonda.FINALIZADA;
        return this.rondaRepo.save(ronda);
    }
    async generarClasificados(id) {
        const competencia = await this.competenciaRepo.findOne({ where: { id } });
        if (!competencia)
            throw new common_1.BadRequestException('Competencia no encontrada');
        const resultados = await this.puntajeRepo
            .createQueryBuilder('puntaje')
            .leftJoin('puntaje.equipo', 'equipo')
            .leftJoin('equipo.miembros', 'miembro')
            .leftJoin('miembro.participante', 'participante')
            .where('participante.competencia_id = :id', { id })
            .select('participante.id', 'participanteId')
            .addSelect('SUM(puntaje.puntos)', 'total')
            .groupBy('participante.id')
            .orderBy('total', 'DESC')
            .limit(3)
            .getRawMany();
        let posicion = 1;
        for (const r of resultados) {
            const participante = await this.participanteRepo.findOne({
                where: { id: r.participanteId },
            });
            if (!participante) {
                console.warn(`Participante con ID ${r.equipo_id} no encontrado, se omite clasificado.`);
                continue;
            }
            const clasificado = this.clasificadoRepo.create({
                participante,
                competencia,
                puntajeTotal: Number(r.total),
                posicion: posicion++,
            });
            await this.clasificadoRepo.save(clasificado);
        }
        return { message: 'Clasificados generados exitosamente' };
    }
};
exports.CompetenciaService = CompetenciaService;
exports.CompetenciaService = CompetenciaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(competencia_entity_1.Competencia)),
    __param(1, (0, typeorm_1.InjectRepository)(participante_entity_1.Participante)),
    __param(2, (0, typeorm_1.InjectRepository)(ronda_entity_1.Ronda)),
    __param(3, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(4, (0, typeorm_1.InjectRepository)(miembros_equipo_entity_1.MiembroEquipo)),
    __param(5, (0, typeorm_1.InjectRepository)(ronda_equipos_entity_1.RondaEquipo)),
    __param(6, (0, typeorm_1.InjectRepository)(pista_entity_1.Pista)),
    __param(7, (0, typeorm_1.InjectRepository)(clasificado_entity_1.Clasificado)),
    __param(8, (0, typeorm_1.InjectRepository)(puntaje_entity_1.Puntaje)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompetenciaService);
//# sourceMappingURL=competencia.service.js.map