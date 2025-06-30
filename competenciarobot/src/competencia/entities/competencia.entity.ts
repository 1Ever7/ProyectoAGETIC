 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pista } from '../../pista/entities/pista.entity';
import { Participante } from '../../participantes/entities/participante.entity';
import { Ronda } from '../../rondas/entities/ronda.entity';
import { Clasificado } from '../../clasificados/entities/clasificado.entity'; // Nueva importaci

@Entity()
export class Competencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_fin: Date;

  @Column({ default: 3 })
  numero_clasificados: number;

  @Column({ 
    type: 'varchar', 
    length: 50, 
    default: 'configuracion' 
  })
  estado: 'configuracion' | 'en_progreso' | 'finalizada';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  actualizado_en: Date;

  @OneToMany(() => Pista, pista => pista.competencia)
  pistas: Pista[];

  @OneToMany(() => Participante, participante => participante.competencia)
  participantes: Participante[];

  @OneToMany(() => Ronda, ronda => ronda.competencia)
  rondas: Ronda[];


  @OneToMany(() => Clasificado, clasificado => clasificado.competencia)
  clasificados: Clasificado[];
}