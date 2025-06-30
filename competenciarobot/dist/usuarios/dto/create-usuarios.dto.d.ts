export declare enum Rol {
    ADMIN = "admin",
    JUEZ = "juez",
    VISOR = "visor"
}
export declare class CreateUsuarioDto {
    email: string;
    password: string;
    rol: Rol;
}
