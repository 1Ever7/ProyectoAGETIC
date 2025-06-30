import { IsInt, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateLogDto {
  @IsOptional()
  @IsInt()
  usuario_id?: number;

  @IsString()
  accion: string;

  @IsOptional()
  @IsString()
  tabla_afectada?: string;

  @IsOptional()
  @IsInt()
  registro_id?: number;

  @IsOptional()
  @IsObject()
  detalles?: any;
}
