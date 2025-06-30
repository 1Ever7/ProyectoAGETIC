import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Participante } from '../../participantes/entities/participante.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';


@Entity('clasificados')
export class Clasificado {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Participante, participante => participante.clasificaciones, { onDelete: 'CASCADE' })
  participante: Participante;

  @ManyToOne(() => Competencia, competencia => competencia.clasificados, { onDelete: 'CASCADE' })
  competencia: Competencia;

  @Column({ type: 'integer' })
  posicion: number;

  @Column({ name: 'puntaje_total', type: 'integer' })
  puntajeTotal: number;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;
}