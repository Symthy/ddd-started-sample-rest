import { GroupModel } from "#/db/entity/GroupModel";
import { GroupData } from "#/dto/group/GroupData";
import { IGroupRepository } from "#/repository/group/IGroupRepository";
import { Inject } from "typedi/decorators/Inject";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Group } from "../model/group/Group";
import { GroupId } from "../model/group/GroupId";
import { GroupName } from "../model/group/GroupName";
import { User } from "../model/user/User";
import { IGroupFactory } from "./IGroupFactory";
import { IUserFactory } from "./IUserFactory";

export class GroupFactory implements IGroupFactory {
  @OrmRepository(GroupModel)
  private groupRepository!: IGroupRepository;
  @Inject()
  private userFactory!: IUserFactory;

  async createDecideId(name: GroupName, owner: User, members?: Array<User>): Promise<Group> {
    const group = this.groupRepository.getNextId().then(result => {
      return new Group(new GroupId(result), name, owner, members);
    });
    return group;
  }

  create(id?: GroupId, name?: GroupName, owner?: User, members?: Array<User>): Group {
    return new Group(id, name, owner, members);
  }

  createFromModel(model: GroupData): Group {
    const { id, name, owner, member } = model;
    return new Group(
      new GroupId(id),
      new GroupName(name),
      this.userFactory.createFromModel(owner),
      member.users.map(user => this.userFactory.createFromModel(user))
    );
  }
}
