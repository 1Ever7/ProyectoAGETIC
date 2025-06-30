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
exports.TutoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tutor_entity_1 = require("./entities/tutor.entity");
let TutoresService = class TutoresService {
    tutorRepository;
    constructor(tutorRepository) {
        this.tutorRepository = tutorRepository;
    }
    async create(dto) {
        const tutor = this.tutorRepository.create(dto);
        return this.tutorRepository.save(tutor);
    }
    async findAll(filterDto) {
        const query = this.tutorRepository.createQueryBuilder('tutor');
        if (filterDto.nombre_completo) {
            query.andWhere('LOWER(tutor.nombre_completo) LIKE LOWER(:nombre)', {
                nombre: `%${filterDto.nombre_completo}%`,
            });
        }
        return query.getMany();
    }
    async findOne(id) {
        const tutor = await this.tutorRepository.findOne({ where: { id } });
        if (!tutor)
            throw new common_1.NotFoundException('Tutor no encontrado');
        return tutor;
    }
    async update(id, dto) {
        await this.tutorRepository.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.tutorRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Tutor con id ${id} no encontrado`);
        }
        return { message: `Tutor con id ${id} eliminado correctamente` };
    }
};
exports.TutoresService = TutoresService;
exports.TutoresService = TutoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tutor_entity_1.Tutor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TutoresService);
//# sourceMappingURL=tutores.service.js.map