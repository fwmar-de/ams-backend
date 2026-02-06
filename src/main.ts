import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('AMS API')
    .setDescription('AMS API documentation')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('locations', 'Location management endpoints')
    .addTag('health', 'Health check endpoints')
    .addServer('http://localhost:3000', 'Local development')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      urls: [
        {
          url: '/api/v1-json',
          name: 'v1 (JSON)',
        },
        {
          url: '/api/v1-yaml',
          name: 'v1 (YAML)',
        },
      ],
    },
    jsonDocumentUrl: '/api/v1-json',
    yamlDocumentUrl: '/api/v1-yaml',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap', err);
  process.exit(1);
});
