import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Participante } from '../../participantes/entities/participante.entity';

@Entity('tutores')
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'documento_identidad', type: 'varchar', length: 50, unique: true })
  documentoIdentidad: string;

  @Column({ name: 'nombre_completo', type: 'varchar', length: 255 })
  nombreCompleto: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;

  @Column({ 
    name: 'actualizado_en', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  actualizadoEn: Date;

  @OneToMany(() => Participante, participante => participante.tutor)
  participantes: Participante[];
}