"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePuntajeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_puntajes_dto_1 = require("./create-puntajes.dto");
class UpdatePuntajeDto extends (0, swagger_1.PartialType)(create_puntajes_dto_1.CreatePuntajeDto) {
}
exports.UpdatePuntajeDto = UpdatePuntajeDto;
//# sourceMappingURL=update-puntajes.dto.js.map