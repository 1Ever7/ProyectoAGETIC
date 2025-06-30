import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { EstadoPista } from '../../common/enums';


@Entity('pistas')
export class Pista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'Nombre temporal' })
  nombre: string;


  @Column({ type: 'enum', enum: EstadoPista, default: EstadoPista.DISPONIBLE })
  estado: EstadoPista;

  @ManyToOne(() => Competencia, competencia => competencia.pistas, { onDelete: 'CASCADE' })
  competencia: Competencia;

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizado_en: Date;

  @OneToMany(() => Ronda, ronda => ronda.pista)
  rondas: Ronda[];
}

