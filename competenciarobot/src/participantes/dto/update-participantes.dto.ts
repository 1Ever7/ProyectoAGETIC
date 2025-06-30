import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipanteDto } from './create-participantes.dto';

export class UpdateParticipanteDto extends PartialType(CreateParticipanteDto) {}
