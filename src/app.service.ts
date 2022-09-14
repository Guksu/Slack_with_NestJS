import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // ---------------process.env.SAMPLE 이런방식 대신 ConfigService를 사용하면 Nest가 env도 제어하므로 나중에 테스트하기에도 편하다---------------//
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.get('SAMPLE');
  }
}
