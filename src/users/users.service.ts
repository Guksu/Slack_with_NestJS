import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, DataSource } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private connection: DataSource,
  ) {}

  async postUsers(email: string, nickname: string, password: string) {
    // 트랜젝션을 사용하는 코드
    // 트랜잭션 시 queryRunner.manager.getRepository로 연결해줘야 트랜잭션 세션이 동작한다.
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new Error('이미 존재하는 유저입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    try {
      await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
