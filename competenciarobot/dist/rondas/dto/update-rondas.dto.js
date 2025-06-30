"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRondaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_rondas_dto_1 = require("./create-rondas.dto");
class UpdateRondaDto extends (0, swagger_1.PartialType)(create_rondas_dto_1.CreateRondaDto) {
}
exports.UpdateRondaDto = UpdateRondaDto;
//# sourceMappingURL=update-rondas.dto.js.map