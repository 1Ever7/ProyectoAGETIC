import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Rol } from './create-usuarios.dto';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(Rol)
  rol?: Rol;

  @IsOptional()
  activo?: boolean;
}
