import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";

export interface IGroupRepository {
  save(group: Group): void;
  findById(id: GroupId): Promise<Group | null>;
  find(group: Group): Promise<Array<Group>>;
  findAll(): Promise<Array<Group>>;
  getNextId(): Promise<number>;
  remove(id: GroupId): Promise<Group>;
}
