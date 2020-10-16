import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";
import { UserData } from "#/dto/user/UserData";
import { GroupApplicationService } from "#/service/group/GroupApplicationService";
import { Get, Param } from "routing-controllers";

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
}
