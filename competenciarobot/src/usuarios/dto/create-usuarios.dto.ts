 
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Rol {
  ADMIN = 'admin',
  JUEZ = 'juez',
  VISOR = 'visor',
}

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Rol)
  rol: Rol;
}
