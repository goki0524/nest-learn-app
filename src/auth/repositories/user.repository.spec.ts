import { Test } from '@nestjs/testing'
import { UserRepository } from './user.repository'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'

const mockCredentialsDto = { username: 'TestUsername', password: 'TestPassword' }

describe('UserRepository', () => {
  let userRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile()

    userRepository = await module.get<UserRepository>(UserRepository)
  })

  describe('signUp', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      userRepository.create = jest.fn().mockReturnValue({ save })
    })
    it('successfully signs up the user', () => {
      save.mockReturnValue(undefined)
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()
    })
    // it('throws a conflict exception as username already exists', () => {
    //   save.mockRejectedValue({ code: '23505' })
    //   expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException)
    // })
    // it('throws a conflict exception as username already exists', () => {
    //   save.mockRejectedValue({ code: '123123' }); // unhandled error code
    //   expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    // })
  })
})
