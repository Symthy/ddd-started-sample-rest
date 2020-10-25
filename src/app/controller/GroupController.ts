import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";
import { GroupCreateCommand } from "#/service/group/command/GroupCreateCommand";
import { GroupApplicationService } from "#/service/group/GroupApplicationService";
import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import { GroupPostRequestModel } from "./request/group/GroupPostRequestModel";
import { GroupPutRequestModel } from "./request/group/GroupPutRequestModel";

@JsonController('/groups')
export class GroupController {

  @Inject('user.service')
  private readonly _groupApplicationService!: GroupApplicationService;

  @Get('/')
  public index(): Promise<GroupDataList> {
    return this._groupApplicationService.getAll();
  }

  @Get('/:id')
  public get(@Param("id") id: number): Promise<GroupData | null> {
    const command = new GroupGetCommand(id);
    return this._groupApplicationService.get(command);
  }

  @Post('/')
  public post(@Body() group: GroupPostRequestModel): void {
    const command = new GroupCreateCommand(group.name, group.ownerId);
    this._groupApplicationService.create(command);
  }

  @Put('/:id')
  public put(@Param('id') id: number, @Body() group: GroupPutRequestModel): void {
    if (group.name || group.ownerId) {
      const command = new GroupUpdateCommand(id, group.name, group.ownerId);
      this._groupApplicationService.update(command);
    }
  }

  @Delete('/:id')
  public delete(@Param('id') id: number) {
    const command = new GroupDeleteCommand(id);
    this._groupApplicationService.delete(command);
  }
}
