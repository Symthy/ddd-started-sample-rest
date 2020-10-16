import { IGroupFactory } from "#/domain/factory/IGroupFactory";
import { IUserFactory } from "#/domain/factory/IUserFactory";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";
import { UserId } from "#/domain/model/user/UserId";
import { UserName } from "#/domain/model/user/UserName";
import { transferType } from "#/domain/model/user/UserType";
import { GroupService } from "#/domain/service/GroupService";
import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";
import { CanNotRegisterGroupException } from "#/exception/CanNotRegisterGroupException";
import { GroupFullException } from "#/exception/GroupFullException";
import { GroupNotFoundException } from "#/exception/GroupNotFoundException";
import { UserNotFoundException } from "#/exception/UserNotFoundException";
import { IGroupRepository } from "#/repository/group/IGroupRepository";
import { IUserRepository } from "#/repository/user/IUserRepository";
import { Transaction } from "typeorm";
import { GroupCreateCommand } from "./command/GroupCreateCommand";
import { GroupJoinCommand } from "./command/GroupJoinCommand";

export class GroupApplicationService {
  public constructor(
    private _groupFactory: IGroupFactory,
    private _groupRepository: IGroupRepository,
    private _groupService: GroupService,
    private _userFactory: IUserFactory,
    private _userRepository: IUserRepository) {
  }

  public get(command: GroupGetCommand): Promise<GroupData | null> {
    const id = new GroupId(command.id);
    return this._groupRepository.findById(id);
  }

  public getAll(): Promise<GroupDataList> {
    return this._groupRepository.findAll();
  }

  @Transaction()
  public create(command: GroupCreateCommand): void {
    const ownerId = new UserId(command.ownerId);
    this._userRepository.findById(ownerId).then(ownerData => {
      if (ownerData == null) {
        throw new UserNotFoundException(ownerId);
      }
      const name = new GroupName(command.name);
      const owner = this._userFactory.create(
        new UserId(ownerData.id),
        ownerData.name ? new UserName(ownerData.name) : undefined,
        ownerData.type ? transferType(ownerData.type) : undefined);
      const group = this._groupFactory.create(name, owner);
      if (this._groupService.exists(group)) {
        throw new CanNotRegisterGroupException(group);
      }
      this._groupRepository.save(group);
    });
  }

  @Transaction()
  public join(command: GroupJoinCommand) {
    const userId = new UserId(command.userId);
    this._userRepository.findById(userId).then(memberData => {
      if (memberData == null) {
        throw new UserNotFoundException(userId);
      }
      const groupId = new GroupId(command.groupId);
      const group = this._groupRepository.findById(groupId);
      if (group == null) {
        throw new GroupNotFoundException(groupId);
      }
      if (group.isFull()) {
        throw new GroupFullException(groupId);
      }
      const member = this._userFactory.create(
        new UserId(memberData.id),
        memberData.name ? new UserName(memberData.name) : undefined,
        memberData.type ? transferType(memberData.type) : undefined);
      group.members.push(member);
      this._groupRepository.save(group);
    });
  }
}