import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = YAML.load('doc/api.yaml');
  SwaggerModule.setup('api', app, swaggerDocument);

  const PORT = parseInt(process.env.PORT) || 4000;
  await app.listen(PORT);

  console.log(
    `\n Server running on \x1b[33mhttp://localhost:${PORT}\x1b[0m \n`,
  );
  console.log(
    `\n Swagger running on \x1b[33mhttp://localhost:${PORT}/api\x1b[0m \n`,
  );
}
bootstrap();
