import { GroupData } from "#/dto/group/GroupData";
import { Group } from "../model/group/Group";
import { GroupId } from "../model/group/GroupId";
import { GroupName } from "../model/group/GroupName";
import { User } from "../model/user/User";

export interface IGroupFactory {
  createDecideId(name: GroupName, owner: User, members?: Array<User>): Promise<Group>
  create(id: GroupId, name: GroupName, owner: User, members: Array<User>): Group;
  createFromModel(model: GroupData): Group;
}
