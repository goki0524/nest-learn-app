import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import config from 'config'

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

  const port: number = Number(process.env.PORT) || Number(config.get('server.port'))
  await app.listen(port)
  logger.log(`Application listenig on http://localhost:${port}/`)
}
bootstrap()
