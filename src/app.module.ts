import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ---------------NestJs판 dotenv---------------------------//
import { ConfigModule, ConfigService } from '@nestjs/config';
//---------------------------------------------------------//
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User } from './common/decorators/user.decorator';

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
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], //env를 configservice를 이용하는 경우 이렇게 바꿔야한다.
      useFactory: async () => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [],
          synchronize: false, // 해당 사항이 true이면 DB와 동기화가 되므로 테이블 만든 후 false로 바꾸는게 좋다
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
