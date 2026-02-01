import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AzureAdAuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @Get('secure')
  @UseGuards(AzureAdAuthGuard)
  getSecure(@Req() req: any) {
    console.log('Request:', req);
    return {
      message: 'Token valid 🎉',
    };
  }
}
