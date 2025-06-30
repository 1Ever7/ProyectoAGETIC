import { PartialType } from '@nestjs/swagger';
import { CreateRondaDto } from './create-rondas.dto';

export class UpdateRondaDto extends PartialType(CreateRondaDto) {}
