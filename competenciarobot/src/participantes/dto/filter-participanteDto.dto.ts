import { IsOptional, IsString } from 'class-validator';

export class FilterParticipantesDto {
  @IsOptional()
  @IsString()
  documentoIdentidad?: string;  // usa camelCase o lo que esté en tu base


  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsString()
  provincia?: string;

  @IsOptional()
  @IsString()
  municipio?: string;


}
