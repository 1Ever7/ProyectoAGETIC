// src/logs_sistema/logs_sistema.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { LogsSistemaService } from './log_sistema.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Logs Sistema')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('logs-sistema')
export class LogsSistemaController {
  constructor(private readonly service: LogsSistemaService) {}

  @Post()
  create(@Body() dto: CreateLogDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

