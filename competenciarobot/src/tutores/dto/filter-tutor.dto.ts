import { IsOptional, IsString } from 'class-validator';

export class FilterTutorDto {
  @IsOptional()
  @IsString()
  documento_identidad?: string;

  @IsOptional()
  @IsString()
  nombre_completo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
