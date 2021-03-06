import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepositroy } from './user.repository'
import { User } from './user.entity'
import config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepositroy)
    private userRepositroy: UserRepositroy,
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
