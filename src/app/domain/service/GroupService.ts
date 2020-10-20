import { IGroupRepository } from "#/repository/group/IGroupRepository";
import { Group } from "../model/group/Group";

export class GroupService {
  public constructor(private readonly _groupRepository: IGroupRepository) {
  }
  public exists(group: Group): boolean {
    const duplicated = this._groupRepository.find(group);
    return duplicated != null;
  }
}
