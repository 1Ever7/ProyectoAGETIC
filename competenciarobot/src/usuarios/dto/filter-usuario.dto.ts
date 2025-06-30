import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Rol } from './create-usuarios.dto';

export class FilterUsuarioDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(Rol)
  rol?: Rol;

  @IsOptional()
  activo?: boolean;
}
