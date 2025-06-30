import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificadoDto } from './create-clasificado.dto';

export class UpdateClasificadoDto extends PartialType(CreateClasificadoDto) {}
