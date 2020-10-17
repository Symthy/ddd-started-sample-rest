import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";
import { GroupCreateCommand } from "#/service/group/command/GroupCreateCommand";
import { GroupApplicationService } from "#/service/group/GroupApplicationService";
import { group } from "console";
import { Body, Get, Param, Post } from "routing-controllers";
import { GroupPostRequestModel } from "./request/group/GroupPostRequestModel";

export class GroupController {

  constructor(private readonly _groupApplicationService: GroupApplicationService) {
  }

  @Get('/groups')
  public index(): Promise<GroupDataList> {
    return this._groupApplicationService.getAll();
  }

  @Get('/groups/:id')
  public get(@Param("id") id: number): Promise<GroupData | null> {
    const command = new GroupGetCommand(id);
    return this._groupApplicationService.get(command);
  }

  @Post('/groups')
  public post(@Body() group: GroupPostRequestModel): void {
    const command = new GroupCreateCommand(group.name, group.ownerId);
    this._groupApplicationService.create(command);
  }
}
