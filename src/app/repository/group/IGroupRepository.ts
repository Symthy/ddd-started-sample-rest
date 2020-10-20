import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";

export interface IGroupRepository {
  save(group: Group): void;
  findById(id: GroupId): Promise<GroupData | null>;
  find(group: Group): Promise<GroupDataList>;
  findAll(): Promise<GroupDataList>;
  getNextId(): Promise<number>;
  remove(id: GroupId): Promise<GroupData>;
}
