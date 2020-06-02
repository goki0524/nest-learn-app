import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import config from 'config'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || config.get('db.host'),
  port: Number(process.env.RDS_PORT) || Number(config.get('db.port')),
  username: process.env.RDS_USERNAME || config.get('db.username'),
  password: process.env.RDS_PASSWORD || config.get('db.password'),
  database: process.env.RDS_DB_NAME || config.get('db.database'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.TYPEORM_SYNC) || Boolean(config.get('db.synchronize')),
}
