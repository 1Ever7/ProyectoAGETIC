
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTutorDto {
  @IsNotEmpty()
  @IsString()
  documento_identidad: string;

  @IsNotEmpty()
  @IsString()
  nombre_completo: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
