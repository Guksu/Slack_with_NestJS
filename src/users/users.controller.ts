import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { undefinedTonnull } from 'src/common/interceptors/undefinedTonull.interceptors';
import { JoinRequestDto } from '../common/dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(undefinedTonnull)
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.users;
  }

  @Post()
  async postUers(@Body() data: JoinRequestDto) {
    await this.userService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  logIn() {}

  @Post('logout')
  logOut(@Req() req) {
    return req.logOut();
  }
}
