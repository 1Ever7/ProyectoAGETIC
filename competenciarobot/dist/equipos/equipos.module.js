"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquiposModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipos_service_1 = require("./equipos.service");
const equipos_controller_1 = require("./equipos.controller");
const equipo_entity_1 = require("./entities/equipo.entity");
let EquiposModule = class EquiposModule {
};
exports.EquiposModule = EquiposModule;
exports.EquiposModule = EquiposModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([equipo_entity_1.Equipo])],
        providers: [equipos_service_1.EquiposService],
        controllers: [equipos_controller_1.EquiposController],
        exports: [typeorm_1.TypeOrmModule],
    })
], EquiposModule);
//# sourceMappingURL=equipos.module.js.map