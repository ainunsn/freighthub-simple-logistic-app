import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ResponseInterceptor } from './common/interceptors/response.interceptors'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()

  const version = require('../../package.json').version || '1.0.0'

  const config = new DocumentBuilder()
    .setTitle('Logistic Tracking App')
    .setDescription('Dokumentasi API untuk aplikasi tracking logistic')
    .setVersion(version)
    .addBearerAuth()
    .addServer('/', 'Base URL')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
