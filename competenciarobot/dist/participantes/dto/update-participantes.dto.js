"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParticipanteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_participantes_dto_1 = require("./create-participantes.dto");
class UpdateParticipanteDto extends (0, mapped_types_1.PartialType)(create_participantes_dto_1.CreateParticipanteDto) {
}
exports.UpdateParticipanteDto = UpdateParticipanteDto;
//# sourceMappingURL=update-participantes.dto.js.map