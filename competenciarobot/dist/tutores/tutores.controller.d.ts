import { TutoresService } from './tutores.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutores.dto';
import { FilterTutorDto } from './dto/filter-tutor.dto';
export declare class TutoresController {
    private readonly tutoresService;
    constructor(tutoresService: TutoresService);
    create(dto: CreateTutorDto): Promise<import("./entities/tutor.entity").Tutor>;
    findAll(filterDto: FilterTutorDto): Promise<import("./entities/tutor.entity").Tutor[]>;
    findOne(id: string): Promise<import("./entities/tutor.entity").Tutor>;
    update(id: string, dto: UpdateTutorDto): Promise<import("./entities/tutor.entity").Tutor>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
