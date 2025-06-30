import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        rol: "admin" | "juez" | "visor";
        activo: boolean;
        creado_en: Date;
        actualizado_en: Date;
    } | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            rol: "admin" | "juez" | "visor";
            activo: boolean;
            creado_en: Date;
            actualizado_en: Date;
        };
    }>;
}
