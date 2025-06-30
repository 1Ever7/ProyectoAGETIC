import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MiembroEquipo } from '../../miembros_equipo/entities/miembros_equipo.entity';
import { RondaEquipo } from '../../ronda_equipos/entities/ronda_equipos.entity';
import { Puntaje } from '../../puntajes/entities/puntaje.entity';

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  color: 'rojo' | 'azul';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  actualizado_en: Date;

  @OneToMany(() => MiembroEquipo, miembro => miembro.equipo)
  miembros: MiembroEquipo[];

  @OneToMany(() => RondaEquipo, rondaEquipo => rondaEquipo.ronda)
  rondas: RondaEquipo[];

  @OneToMany(() => Puntaje, puntaje => puntaje.equipo)
  puntajes: Puntaje[];
}