import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";
import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";

export interface IGroupRepository {
  save(group: Group): void;
  findById(id: GroupId): Promise<GroupData | null>;
  find(name: GroupName): Promise<GroupData | null>;
  findAll(): Promise<GroupDataList>;
  getNextId(): Promise<number>;
}
