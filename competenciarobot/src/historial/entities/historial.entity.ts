import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Competencia } from '../../competencia/entities/competencia.entity';

@Entity('historial_competencias')
export class HistorialCompetencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competencia, competencia => competencia.id, { onDelete: 'SET NULL' })
  competencia: Competencia;

  @Column({ type: 'integer' })
  gestion: number;

  @Column({ type: 'varchar', length: 50 })
  version: string;

  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ name: 'total_participantes', type: 'integer', nullable: true })
  totalParticipantes: number;

  @Column({ name: 'total_rondas', type: 'integer', nullable: true })
  totalRondas: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;
}