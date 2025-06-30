import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Pista } from '../../pista/entities/pista.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';
import { Puntaje } from '../../puntajes/entities/puntaje.entity';

export type EstadoRonda = 'pendiente' | 'en_progreso' | 'finalizada';

@Entity('rondas')
export class Ronda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_ronda', type: 'int' })
  numeroRonda: number;

  @Column({ name: 'fecha_hora', type: 'timestamp', nullable: true })
  fechaHora: Date;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en_progreso', 'finalizada'],
    default: 'pendiente',
  })
  estado: EstadoRonda;

  @ManyToOne(() => Pista, pista => pista.rondas, { onDelete: 'SET NULL' })
  pista: Pista;

  @ManyToOne(() => Competencia, competencia => competencia.rondas, { onDelete: 'CASCADE' })
  competencia: Competencia;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  actualizadoEn: Date;

  @OneToMany(() => RondaEquipo, rondaEquipo => rondaEquipo.ronda)
  equipos: RondaEquipo[];

  @OneToMany(() => Puntaje, puntaje => puntaje.ronda)
  puntajes: Puntaje[];
}
