import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutores.dto';
import { FilterTutorDto } from './dto/filter-tutor.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';

@ApiTags('Tutores')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Tutor creado correctamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreateTutorDto) {
    try {
      return await this.tutoresService.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de tutores' })
  async findAll(@Query() filterDto: FilterTutorDto) {
    return await this.tutoresService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Tutor encontrado' })
  @ApiNotFoundResponse({ description: 'Tutor no encontrado' })
  async findOne(@Param('id') id: string) {
    const tutor = await this.tutoresService.findOne(+id);
    if (!tutor) {
      throw new NotFoundException(`Tutor con id ${id} no encontrado`);
    }
    return tutor;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Tutor actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Tutor no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateTutorDto) {
    const updated = await this.tutoresService.update(+id, dto);
    if (!updated) {
      throw new NotFoundException(`Tutor con id ${id} no encontrado`);
    }
    return updated;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Tutor eliminado correctamente' })
  @ApiNotFoundResponse({ description: 'Tutor no encontrado' })
  async remove(@Param('id') id: string) {
    const deleted = await this.tutoresService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Tutor con id ${id} no encontrado`);
    }
    return deleted;
  }
}
