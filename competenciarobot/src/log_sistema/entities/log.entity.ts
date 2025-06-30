
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuarios.entity'; // Ajusta la ruta según tu estructura

@Entity('logs_sistema')
export class LogSistema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 255 })
  accion: string;

  @Column({ name: 'tabla_afectada', type: 'varchar', length: 100, nullable: true })
  tablaAfectada: string;

  @Column({ name: 'registro_id', type: 'int', nullable: true })
  registroId: number;

  @Column({ type: 'jsonb', nullable: true })
  detalles: any;

  @CreateDateColumn({ name: 'creado_en', type: 'timestamp' })
  creadoEn: Date;
}
