import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';

@Entity('puntajes')
@Unique(['equipo', 'ronda'])
export class Puntaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  puntos: number;

  @ManyToOne(() => RondaEquipo, equipo => equipo.ronda, { onDelete: 'CASCADE' })
  equipo: RondaEquipo;

  @ManyToOne(() => Ronda, ronda => ronda.puntajes, { onDelete: 'CASCADE' })
  ronda: Ronda;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  actualizado_en: Date;
}