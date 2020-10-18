import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";
import { User } from "#/domain/model/user/User";

export interface IGroupNotification {
  id(id: GroupId): void;
  name(name: GroupName): void;
  owner(owner: User): void;
  members(members: Array<User>): void;
}
