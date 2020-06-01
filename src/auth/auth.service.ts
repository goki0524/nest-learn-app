import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepositroy } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositroy)
    private userRepository: UserRepositroy,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)
    
    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
