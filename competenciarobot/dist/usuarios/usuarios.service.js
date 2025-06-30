"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuarios_entity_1 = require("./entities/usuarios.entity");
const bcrypt = require("bcrypt");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async findByEmail(email) {
        if (!email)
            throw new common_1.BadRequestException('Email no proporcionado');
        const user = await this.usuarioRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return user;
    }
    async create(createUsuarioDto) {
        const existingUser = await this.usuarioRepository.findOne({
            where: { email: createUsuarioDto.email }
        });
        if (existingUser) {
            throw new common_1.ConflictException('Este email ya está registrado');
        }
        try {
            const hash = await bcrypt.hash(createUsuarioDto.password, 10);
            const usuario = this.usuarioRepository.create({
                ...createUsuarioDto,
                password: hash,
            });
            return await this.usuarioRepository.save(usuario);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el usuario');
        }
    }
    async findAll() {
        try {
            return await this.usuarioRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al obtener usuarios');
        }
    }
    async findOne(id) {
        if (!id || isNaN(id)) {
            throw new common_1.BadRequestException('ID inválido');
        }
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return usuario;
    }
    async update(id, updateDto) {
        if (!id || isNaN(id)) {
            throw new common_1.BadRequestException('ID inválido');
        }
        try {
            await this.usuarioRepository.update(id, updateDto);
            const updatedUser = await this.findOne(id);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al actualizar el usuario');
        }
    }
    async remove(id) {
        if (!id || isNaN(id)) {
            throw new common_1.BadRequestException('ID inválido');
        }
        const result = await this.usuarioRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map