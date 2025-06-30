import { Entity, PrimaryGeneratedColumn, ManyToOne, Column,JoinColumn } from 'typeorm';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity('ronda_equipos')
export class RondaEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ronda, ronda => ronda.equipos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ronda_id' })
  ronda: Ronda;

  @ManyToOne(() => Equipo, equipo => equipo.rondas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}
