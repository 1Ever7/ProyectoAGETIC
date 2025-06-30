import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competencia } from './entities/competencia.entity';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
import { Participante } from '../participantes/entities/participante.entity';
import { Ronda } from '../rondas/entities/ronda.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { MiembroEquipo } from '../miembros_equipo/entities/miembros_equipo.entity';
import { RondaEquipo } from '../ronda_equipos/entities/ronda_equipos.entity';
import { Pista } from '../pista/entities/pista.entity';
import { Clasificado } from '../clasificados/entities/clasificado.entity';
import { Puntaje } from '../puntajes/entities/puntaje.entity';
import { EstadoCompetencia, EstadoRonda,EstadoPista } from '../common/enums';


@Injectable()
export class CompetenciaService {
  constructor(
    @InjectRepository(Competencia)
    private readonly competenciaRepo: Repository<Competencia>,

    @InjectRepository(Participante)
    private participanteRepo: Repository<Participante>,

    @InjectRepository(Ronda)
    private rondaRepo: Repository<Ronda>,

    @InjectRepository(Equipo)
    private equipoRepo: Repository<Equipo>,

    @InjectRepository(MiembroEquipo)
    private miembroRepo: Repository<MiembroEquipo>,

    @InjectRepository(RondaEquipo)
    private rondaEquipoRepo: Repository<RondaEquipo>,

    @InjectRepository(Pista)
    private pistaRepo: Repository<Pista>,

    @InjectRepository(Clasificado)
    private clasificadoRepo: Repository<Clasificado>,

    @InjectRepository(Puntaje)
    private puntajeRepo: Repository<Puntaje>,
  ) {}

 async create(dto: CreateCompetenciaDto): Promise<Competencia> {
    try {
      const competencia = this.competenciaRepo.create(dto);
      return await this.competenciaRepo.save(competencia);
    } catch (error) {
      throw new BadRequestException('Error al crear la competencia');
    }
  }

  async findAll(): Promise<Competencia[]> {
    try {
      return await this.competenciaRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las competencias');
    }
  }

  async findOne(id: number): Promise<Competencia> {
    const competencia = await this.competenciaRepo.findOne({ where: { id } });
    if (!competencia) throw new NotFoundException('Competencia no encontrada');
    return competencia;
  }

  async update(id: number, dto: UpdateCompetenciaDto): Promise<Competencia> {
    const competencia = await this.findOne(id);
    try {
      this.competenciaRepo.merge(competencia, dto);
      return await this.competenciaRepo.save(competencia);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la competencia');
    }
  }


  async remove(id: number): Promise<void> {
    const competencia = await this.findOne(id);
    if (competencia.estado !== EstadoCompetencia.NO_INICIADA) {
      throw new BadRequestException(
        'No se puede eliminar una competencia en progreso o finalizada',
      );
    }
    try {
      await this.competenciaRepo.remove(competencia);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la competencia');
    }
  }

  async iniciarCompetencia(id: number): Promise<Competencia> {
    const competencia = await this.findOne(id);
    if (competencia.estado !== EstadoCompetencia.NO_INICIADA) {
      throw new BadRequestException(
        'Solo se puede iniciar competencia en estado configuración',
      );
    }
    const participantes = await this.participanteRepo.find({
      where: { competencia: { id } },
    });
    if (participantes.length < 4) {
      throw new BadRequestException(
        'Se requieren al menos 4 participantes para iniciar la competencia',
      );
    }


    
    competencia.estado = EstadoCompetencia.EN_PROGRESO;
    return this.competenciaRepo.save(competencia);
  }

  async finalizarCompetencia(id: number) {
    const competencia = await this.findOne(id);

    if (competencia.estado === EstadoCompetencia.FINALIZADA) {
      throw new BadRequestException('La competencia ya fue finalizada');
    }

    const rondasEnCurso = await this.rondaRepo.count({
      where: {
        competencia: { id },
        estado: EstadoRonda.EN_PROGRESO,
      },
    });

    const rondasPendientes = await this.rondaRepo.count({
      where: {
        competencia: { id },
        estado: EstadoRonda.PENDIENTE,
      },
    });

    if (rondasEnCurso > 0 || rondasPendientes > 0) {
      throw new BadRequestException(
        'No se puede finalizar la competencia mientras existan rondas activas o pendientes',
      );
    }

    await this.generarClasificados(id);

    competencia.estado = EstadoCompetencia.FINALIZADA;
    return this.competenciaRepo.save(competencia);
  }

  async generarRondas(competenciaId: number) {
    const competencia = await this.competenciaRepo.findOne({
      where: { id: competenciaId },
      relations: ['pistas'],
    });
    if (!competencia) throw new NotFoundException('Competencia no encontrada');
    if (competencia.estado !== EstadoCompetencia.NO_INICIADA) {
      throw new BadRequestException(
        'No se pueden generar rondas si la competencia ya inició',
      );
    }

      const participantes = await this.participanteRepo.find({
      where: { competencia: { id: competenciaId } },
      relations: ['tutor'],
      order: { id: 'ASC' }, // Para un orden predecible
    });

    if (participantes.length < 4) throw new BadRequestException('Se requieren al menos 4 participantes para generar rondas.');

    const pistas = await this.pistaRepo.find({ where: { competencia: { id: competenciaId } } });
    if (!pistas.length) throw new BadRequestException('No hay pistas disponibles para la competencia.');

    const equipos: Equipo[] = [];
    const participantesUsados = new Set<number>();

    // Crear equipos de 2 participantes con distintos tutores
    for (let i = 0; i < participantes.length; i++) {
      for (let j = i + 1; j < participantes.length; j++) {
        const p1 = participantes[i];
        const p2 = participantes[j];

        if (
          p1.tutor?.id !== p2.tutor?.id &&
          !participantesUsados.has(p1.id) &&
          !participantesUsados.has(p2.id)
        ) {
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

    if (equipos.length < 2) throw new BadRequestException('No se pudieron formar equipos suficientes.');

    // Calcular cantidad mínima de rondas para que todos participen equitativamente
    const rondasNecesarias = Math.ceil((participantes.length / 2) / pistas.length);

    const rondas: Ronda[] = [];
    let equipoIndex = 0;


    for (let i = 0; i < rondasNecesarias; i++) {
      for (const pista of pistas) {
        if (equipoIndex + 1 >= equipos.length) break;

        const ronda = this.rondaRepo.create({
          numeroRonda: i + 1,
          pista,
          competencia,
          estado: EstadoRonda.PENDIENTE, // Usar enum
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

  async iniciarRonda(rondaId: number) {
    const ronda = await this.rondaRepo.findOne({
      where: { id: rondaId },
      relations: ['pista','competencia'],
    });

    if (!ronda) throw new NotFoundException('Ronda no encontrada');
    if (ronda.estado !== EstadoRonda.PENDIENTE) {
      throw new BadRequestException('La ronda ya fue iniciada o finalizada');
    }
    if (ronda.competencia.estado !== EstadoCompetencia.EN_PROGRESO) {
      throw new BadRequestException('La competencia no está en progreso');
    }

    // 🟡 Cambiar estado de la pista
    ronda.pista.estado = EstadoPista.EN_USO;
    await this.pistaRepo.save(ronda.pista);

    ronda.estado = EstadoRonda.EN_PROGRESO;
    return this.rondaRepo.save(ronda);
  }


  async finalizarRonda(rondaId: number) {
    const ronda = await this.rondaRepo.findOne({
      where: { id: rondaId },
      relations: ['pista'],
    });

    if (!ronda) throw new NotFoundException('Ronda no encontrada');
    if (ronda.estado !== EstadoRonda.EN_PROGRESO) {
      throw new BadRequestException('La ronda no está en progreso');
    }

    // 🟢 Dejar la pista como disponible
    ronda.pista.estado = EstadoPista.DISPONIBLE;
    await this.pistaRepo.save(ronda.pista);

    ronda.estado = EstadoRonda.FINALIZADA;
    return this.rondaRepo.save(ronda);
  }


   async generarClasificados(id: number): Promise<{ message: string }> {
    const competencia = await this.competenciaRepo.findOne({ where: { id } });
    if (!competencia) throw new BadRequestException('Competencia no encontrada');

    // Obtener puntajes agrupados por equipo
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
      .limit(3) // puedes cambiar esto si el número de clasificados es configurable
      .getRawMany();

    // Insertar en tabla clasificados
    let posicion = 1;
    for (const r of resultados) {
      const participante = await this.participanteRepo.findOne({
        where: { id: r.participanteId },
      });
      
      if (!participante) {
        console.warn(`Participante con ID ${r.equipo_id} no encontrado, se omite clasificado.`);
        continue; // Salta esta iteración si no se encuentra
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


}