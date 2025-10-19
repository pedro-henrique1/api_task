import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { IncomingMessage } from 'http';
import { LoggerModule } from 'nestjs-pino';
import configuration from './modules/config/configuration';
import { validationSchema } from './modules/config/validation';
import { TaskModule } from './modules/tasks/task.module';

interface PinoRequest extends IncomingMessage {
  user?: { id: number };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: 60,
        limit: 10,
        throttlers: [],
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV === 'development'
            ? { target: 'pino-pretty' }
            : undefined,
        serializers: {
          req: (req) => ({ method: req.method, url: req.url }),
          res: (res) => ({ statusCode: res.statusCode }),
        },
        genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),
        customProps: (req: PinoRequest) => ({
          requestId: req.id,
          userId: req.user?.id,
        }),
      },
    }),
    TaskModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerModule,
    },
  ],
})
export class AppModule {}
