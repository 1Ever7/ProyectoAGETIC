import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'juez', 'visor'])
  rol: string;
}
