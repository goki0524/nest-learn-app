import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

const PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())

  if (process.env.ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Nest.js learn app')
      .setDescription('Nest.js learn app description')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('swagger', app, document)
  }

  await app.listen(PORT)
  console.log(`Server listening on: http://localhost:${PORT}/`)
}
bootstrap()
