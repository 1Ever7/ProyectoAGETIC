// src/equipos/dto/equipo-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class EquipoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: ['rojo', 'azul'] })
  color: 'rojo' | 'azul';

  @ApiProperty()
  creado_en: Date;

  @ApiProperty()
  actualizado_en: Date;
}
