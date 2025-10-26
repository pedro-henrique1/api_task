import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import crypto from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';
import { LoggerModule } from 'nestjs-pino';
import configuration from './modules/config/configuration';
import { validationSchema } from './modules/config/validation';
import { TaskModule } from './modules/tasks/task.module';

interface PinoRequest extends IncomingMessage {
  user?: { id: number };
  id: string;
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
        transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
        serializers: {
          req: (req: IncomingMessage) => ({
            method: req.method ?? undefined,
            url: req.url ?? undefined,
          }),
          res: (res: ServerResponse) => ({
            statusCode: res.statusCode,
          }),
        },
        genReqId: (req: IncomingMessage) => {
          const r = req as PinoRequest;
          return r.id ?? crypto.randomUUID();
        },
        customProps: (req: IncomingMessage) => {
          const r = req as PinoRequest;
          return {
            requestId: r.id,
            userId: r.user?.id,
          };
        },
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
