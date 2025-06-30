import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  ConflictException,
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario> {
    if (!email) throw new BadRequestException('Email no proporcionado');
    
    const user = await this.usuarioRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Validar email único
    const existingUser = await this.usuarioRepository.findOne({ 
      where: { email: createUsuarioDto.email } 
    });
    if (existingUser) {
      throw new ConflictException('Este email ya está registrado');
    }

    try {
      const hash = await bcrypt.hash(createUsuarioDto.password, 10);
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: hash,
      });
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios');
    }
  }

  async findOne(id: number): Promise<Usuario> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async update(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    try {
      await this.usuarioRepository.update(id, updateDto);
      const updatedUser = await this.findOne(id); // Reutiliza findOne para validar existencia
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: number): Promise<void> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}