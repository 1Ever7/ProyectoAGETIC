import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipanteDto {
  @IsNotEmpty()
  @IsString()
  nombre_equipo: string;

  @IsNotEmpty()
  @IsString()
  departamento: string;

  @IsNotEmpty()
  @IsString()
  provincia: string;

  @IsNotEmpty()
  @IsString()
  municipio: string;

  @IsNotEmpty()
  @IsString()
  documento_identidad: string;

  @IsNotEmpty()
  @IsString()
  nombre_completo: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsString()
  rol: 'participante';

  @IsInt()
  tutor_id: number;

  @IsInt()
  competencia_id: number;
}

