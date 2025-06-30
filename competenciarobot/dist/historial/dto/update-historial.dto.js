"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHistorialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_historial_dto_1 = require("./create-historial.dto");
class UpdateHistorialDto extends (0, mapped_types_1.PartialType)(create_historial_dto_1.CreateHistorialDto) {
}
exports.UpdateHistorialDto = UpdateHistorialDto;
//# sourceMappingURL=update-historial.dto.js.map