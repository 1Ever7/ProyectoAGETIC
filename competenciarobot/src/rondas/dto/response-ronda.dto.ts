import { ApiProperty } from '@nestjs/swagger';

export class RondaResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fecha: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  pistaId: number;

  @ApiProperty()
  competenciaId: number;

  @ApiProperty()
  creadoEn: Date;

  @ApiProperty()
  actualizadoEn: Date;
}
