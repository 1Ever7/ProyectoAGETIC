"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoPista = exports.RolUsuario = exports.EstadoEquipo = exports.EstadoRonda = exports.EstadoCompetencia = void 0;
var EstadoCompetencia;
(function (EstadoCompetencia) {
    EstadoCompetencia["NO_INICIADA"] = "configuracion";
    EstadoCompetencia["EN_PROGRESO"] = "en_progreso";
    EstadoCompetencia["FINALIZADA"] = "finalizada";
})(EstadoCompetencia || (exports.EstadoCompetencia = EstadoCompetencia = {}));
var EstadoRonda;
(function (EstadoRonda) {
    EstadoRonda["PENDIENTE"] = "pendiente";
    EstadoRonda["EN_PROGRESO"] = "en_progreso";
    EstadoRonda["FINALIZADA"] = "finalizada";
})(EstadoRonda || (exports.EstadoRonda = EstadoRonda = {}));
var EstadoEquipo;
(function (EstadoEquipo) {
    EstadoEquipo["PENDIENTE"] = "pendiente";
    EstadoEquipo["EN_COMPETENCIA"] = "en_competencia";
    EstadoEquipo["ELIMINADO"] = "eliminado";
    EstadoEquipo["GANADOR"] = "ganador";
})(EstadoEquipo || (exports.EstadoEquipo = EstadoEquipo = {}));
var RolUsuario;
(function (RolUsuario) {
    RolUsuario["ADMIN"] = "admin";
    RolUsuario["JUEZ"] = "juez";
    RolUsuario["PARTICIPANTE"] = "participante";
})(RolUsuario || (exports.RolUsuario = RolUsuario = {}));
var EstadoPista;
(function (EstadoPista) {
    EstadoPista["DISPONIBLE"] = "disponible";
    EstadoPista["EN_USO"] = "en_uso";
    EstadoPista["MANTENIMIETO"] = "mantenimiento";
})(EstadoPista || (exports.EstadoPista = EstadoPista = {}));
//# sourceMappingURL=enums.js.map