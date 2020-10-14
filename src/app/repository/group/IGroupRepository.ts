import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";

export interface IGroupRepository {
  save(group: Group): void;
  findById(id: GroupId): Group;
  find(name: GroupName): Group;
}
