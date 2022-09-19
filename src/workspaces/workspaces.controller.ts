import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspaces() {}

  @Get(':url/members')
  getAllMembersFromWorkspaces() {}

  @Post(':url/members')
  inviteMemberToWorkspaces() {}

  @Delete(':url/members')
  kickMemberFromWorkspaces() {}

  @Get(':url/members/:id')
  getMemberInfoInWorkspaces() {}
}
