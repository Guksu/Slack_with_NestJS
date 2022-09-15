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

/**
 * providers:[AppService]의 원형은
 * provider:[
 *     {
 *         provider: Appservice    //고유 Key
 *         useClass : Appservice   //실제 사용될 Class()
 *         useValue : "123"       //실제 사용되는 value
 *         useFactory : ()=>{ return "123"}  //실제 사용되는 함수
 *     }
 * ]
 *
 * 실제 controller에서 커스텀한 provider를 사용하기 위해선 아래와 같이 작성해야한다.
 * @Inject("고유 Key") private readonly customClass
 */
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
