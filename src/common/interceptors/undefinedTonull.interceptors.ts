/**
 * 인터셉터는 컨트롤러 실핸 전, 후에 특정한 동작을 시켜준다(AOP 개념과 연관)
 * 아래의 코드는 data가 undefined인 경우 null로 변환시킨다.
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class undefinedTonnull implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
