import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { CreateParticipanteDto } from './dto/create-participantes.dto';
import { UpdateParticipanteDto } from './dto/update-participantes.dto';
import { FilterParticipantesDto } from './dto/filter-participanteDto.dto';

@Controller('participantes')
export class ParticipantesController {
  constructor(private readonly participantesService: ParticipantesService) {}

  @Post()
  create(@Body() createDto: CreateParticipanteDto) {
    return this.participantesService.create(createDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterParticipantesDto) {
    return this.participantesService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateParticipanteDto) {
    return this.participantesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantesService.remove(id);
  }
}
