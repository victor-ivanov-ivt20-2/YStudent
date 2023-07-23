import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(cookieParser());

  const config: ConfigService = app.get<ConfigService>(ConfigService);
  const port = Number(config.get('API_PORT'));
  await app.listen(port);

  logger.log(`App listening on port ${port}`);
}
bootstrap();
