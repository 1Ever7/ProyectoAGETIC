import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipoDto {
  
  @ApiProperty({ enum: ['rojo', 'azul'] })
  @IsIn(['rojo', 'azul'])
  color: 'rojo' | 'azul';
}
