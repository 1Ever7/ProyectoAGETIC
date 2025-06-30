import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    bienvenida(): string;
    status(): {
        sistema: string;
        version: string;
        estado: string;
        fecha: string;
    };
}
