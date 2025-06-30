import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sistema')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  bienvenida() {
    return this.appService.getBienvenida();
  }

  @Get('status')
  status() {
    return this.appService.getStatus();
  }
}
