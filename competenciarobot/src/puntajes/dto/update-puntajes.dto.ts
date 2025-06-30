import { PartialType } from '@nestjs/swagger';
import { CreatePuntajeDto } from './create-puntajes.dto';

export class UpdatePuntajeDto extends PartialType(CreatePuntajeDto) {}