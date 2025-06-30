import { Entity, PrimaryGeneratedColumn, ManyToOne,Column, Unique,JoinColumn } from 'typeorm';
import { Participante } from '../../participantes/entities/participante.entity';
import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity('miembros_equipo')
@Unique(['participante', 'equipo'])
export class MiembroEquipo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Participante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participante_id' }) // Asegúrate de incluir esto
  participante: Participante;

  @ManyToOne(() => Equipo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'equipo_id' }) // También incluye esto
  equipo: Equipo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}
