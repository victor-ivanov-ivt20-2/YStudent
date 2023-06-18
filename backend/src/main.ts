import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');

  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get<ConfigService>(ConfigService);
  const port = Number(config.get('API_PORT'));
  await app.listen(port);

  logger.log(`App listening on port ${port}`);
}
bootstrap();
