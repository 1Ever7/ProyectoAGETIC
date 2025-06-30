"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompetenciaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_competencia_dto_1 = require("./create-competencia.dto");
class UpdateCompetenciaDto extends (0, swagger_1.PartialType)(create_competencia_dto_1.CreateCompetenciaDto) {
}
exports.UpdateCompetenciaDto = UpdateCompetenciaDto;
//# sourceMappingURL=update-competencia.dto.js.map