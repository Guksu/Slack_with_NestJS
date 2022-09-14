import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ---------------NestJs판 dotenv---------------------------//
import { ConfigModule, ConfigService } from '@nestjs/config';
//---------------------------------------------------------//
import { LoggerMiddleware } from './middleware/logger.middleware';

//-----------------------env를 AWS나 외부에서 관리하는 경우에는 load 함수를 사용한다---------------//
const getEnv = async () => {
  // const keyReq = await axios.get("비밀키요청")
  return {
    DB_NAME: '123',
    NAME: 'MIN',
  };
};

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [getEnv] })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
