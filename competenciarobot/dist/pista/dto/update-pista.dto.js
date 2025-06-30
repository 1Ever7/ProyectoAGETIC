"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePistaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pista_dto_1 = require("./create-pista.dto");
class UpdatePistaDto extends (0, mapped_types_1.PartialType)(create_pista_dto_1.CreatePistaDto) {
}
exports.UpdatePistaDto = UpdatePistaDto;
//# sourceMappingURL=update-pista.dto.js.map