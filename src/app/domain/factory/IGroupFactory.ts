import { Group } from "../model/group/Group";
import { GroupName } from "../model/group/GroupName";
import { User } from "../model/user/User";

export interface IGroupFactory {
  create(name: GroupName, owner: User): Group;
}
