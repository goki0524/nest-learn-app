import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './repositories/user.repository'
import { User } from './entities/user.entity'
import config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepositroy: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = await this.userRepositroy.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
