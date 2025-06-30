import { PartialType } from '@nestjs/mapped-types';
import { CreatePistaDto } from './create-pista.dto';

export class UpdatePistaDto extends PartialType(CreatePistaDto) {}
