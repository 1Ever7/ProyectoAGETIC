"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClasificadoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_clasificado_dto_1 = require("./create-clasificado.dto");
class UpdateClasificadoDto extends (0, mapped_types_1.PartialType)(create_clasificado_dto_1.CreateClasificadoDto) {
}
exports.UpdateClasificadoDto = UpdateClasificadoDto;
//# sourceMappingURL=update-clasificados.dto.js.map