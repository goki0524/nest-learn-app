import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

async function bootstrap() {
  // Set up Logger
  const logger = new Logger('bootstrap')

  // Set up Nestjs
  const app = await NestFactory.create(AppModule)

  // Set up helmet
  app.use(helmet())

  // Set up Swagger
  if (process.env.ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Nest.js learn app')
      .setDescription('Nest.js learn app description')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('swagger', app, document)
  }

  const port = 3000
  await app.listen(port)
  logger.log(`Application listenig on http://localhost:${port}/`)
}
bootstrap()
