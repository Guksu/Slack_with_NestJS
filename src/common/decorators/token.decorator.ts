/**
 * 커스텀 데코레이터
 * jwt를 사용하는경우,
 * express 는 request.locals.jwt로 모든 미들웨어에서 토큰 공유가 가능했다.
 * 아래의 데코레이터로 인하여 express에 종속되는것을 막아주며 테스트도 간편하게 진행할 수 있다.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
  },
);
