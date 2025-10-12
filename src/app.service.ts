import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  healthCheck() {
    this.logger.log('Health check endpoint accessed');
    return { status: 'ok' };
  }
}
