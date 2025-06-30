import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Tutor } from '../../tutores/entities/tutor.entity';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { MiembroEquipo } from '../../miembros_equipo/entities/miembros_equipo.entity';
import { Clasificado } from '../../clasificados/entities/clasificado.entity';


@Entity('participantes')
export class Participante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_equipo', type: 'varchar', length: 255, unique: true })
  nombreEquipo: string;

  @Column({ type: 'varchar', length: 100 })
  departamento: string;

  @Column({ type: 'varchar', length: 100 })
  provincia: string;

  @Column({ type: 'varchar', length: 100 })
  municipio: string;

  @Column({ name: 'documento_identidad', type: 'varchar', length: 50, unique: true })
  documentoIdentidad: string;

  @Column({ name: 'nombre_completo', type: 'varchar', length: 255 })
  nombreCompleto: string;

  @Column({ name: 'fecha_nacimiento', type: 'date' })
  fechaNacimiento: Date;

  @Column({ 
    type: 'varchar', 
    length: 50,
    default: 'participante'
  })
  rol: 'participante' | 'tutor';

  @ManyToOne(() => Tutor, tutor => tutor.participantes, { onDelete: 'SET NULL' })
  tutor: Tutor;

  @ManyToOne(() => Competencia, competencia => competencia.participantes, { onDelete: 'CASCADE' })
  competencia: Competencia;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @Column({ 
    name: 'actualizado_en', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  actualizadoEn: Date;

  @OneToMany(() => MiembroEquipo, miembroEquipo => miembroEquipo.participante)
  miembrosEquipos: MiembroEquipo[];

  @OneToMany(() => Clasificado, clasificado => clasificado.participante)
  clasificaciones: Clasificado[];
}