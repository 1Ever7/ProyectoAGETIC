import { IsEnum, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRondaDto {
  @ApiProperty({ example: '2025-08-01T10:00:00Z', description: 'Fecha y hora de la ronda' })
  @IsDateString()
  fechaHora: string;

  @ApiProperty({ example: 1, description: 'ID de la pista asignada' })
  @IsInt()
  pistaId: number;

  @ApiProperty({ example: 1, description: 'ID de la competencia' })
  @IsInt()
  competenciaId: number;

  @ApiProperty({ example: 'pendiente', enum: ['pendiente', 'en_progreso', 'finalizada'] })
  @IsEnum(['pendiente', 'en_progreso', 'finalizada'])
  estado: 'pendiente' | 'en_progreso' | 'finalizada';
}
