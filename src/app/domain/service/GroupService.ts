import { GroupModel } from "#/db/entity/GroupModel";
import { IGroupRepository } from "#/repository/group/IGroupRepository";
import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Group } from "../model/group/Group";

@Service()
export class GroupService {
  @OrmRepository(GroupModel)
  private readonly _groupRepository!: IGroupRepository

  public exists(group: Group): boolean {
    const duplicated = this._groupRepository.find(group);
    return duplicated != null;
  }
}
