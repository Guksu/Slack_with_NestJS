import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  creatChannels() {}

  @Get(':name')
  getSepcificChannel() {}

  @Get(':name/chats')
  getChat(@Query() query, @Param() param) {}

  @Post(':name/chats')
  postChat(@Body body) {}

  @Get(':name/members')
  getAllMembers() {}

  @Post(':name/members')
  inviteMembers() {}
}
