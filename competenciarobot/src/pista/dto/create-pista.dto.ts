import { IsEnum, IsNotEmpty } from 'class-validator';
import { EstadoPista } from '../../common/enums';

export class CreatePistaDto {
  @IsNotEmpty()
  nombre: string;

  @IsEnum(EstadoPista)
  estado: EstadoPista;

  @IsNotEmpty()
  competenciaId: number;
}
