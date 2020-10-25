import { GroupModel } from "#/db/entity/GroupModel";
import { UserModel } from "#/db/entity/UserModel";
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
import { Inject, Service } from "typedi";
import { Transaction } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { GroupCreateCommand } from "./command/GroupCreateCommand";
import { GroupJoinCommand } from "./command/GroupJoinCommand";
import { GroupFullSpecification } from "./spec/GroupFullSpecification";

@Service('group.service')
export class GroupApplicationService {

  @OrmRepository(GroupModel)
  private _groupRepository!: IGroupRepository;
  @OrmRepository(UserModel)
  private _userRepository!: IUserRepository;
  @Inject()
  private _groupService!: GroupService;

  public constructor(
    private _groupFactory: IGroupFactory,
    private _userFactory: IUserFactory
    ) {
  }

  public get(command: GroupGetCommand): Promise<GroupData | null> {
    const id = new GroupId(command.id);
    return this._groupRepository.findById(id)
      .then(group => group == null ? null : new GroupData(group));
  }

  public getAll(): Promise<GroupDataList> {
    return this._groupRepository.findAll().then(groups => new GroupDataList(groups));
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
        new UserId(ownerData.id.value),
        ownerData.name ? new UserName(ownerData.name.value) : undefined,
        ownerData.type ? transferType(ownerData.type) : undefined);
      this._groupFactory.createDecideId(name, owner).then(group => {
        if (this._groupService.exists(group)) {
          throw new CanNotRegisterGroupException(group);
        }
        this._groupRepository.save(group);
      });
    });
  }

  @Transaction()
  public join(command: GroupJoinCommand) {
    const userId = new UserId(command.userId);
    this._userRepository.findById(userId).then(member => {
      if (member == null) {
        throw new UserNotFoundException(userId);
      }
      const groupId = new GroupId(command.groupId);
      this._groupRepository.findById(groupId).then(group => {
        if (group == null) {
          throw new GroupNotFoundException(groupId);
        }

        const groupFullSpec = new GroupFullSpecification(this._userRepository);
        if (groupFullSpec.isSatisfiedBy(group)) {
          throw new GroupFullException(groupId);
        }

        group.members.push(member);
        this._groupRepository.save(group);
      })
    });
  }

  @Transaction()
  public update(command: GroupUpdateCommand): void {
    const id = new GroupId(command.id);
    const name = command.name ? new GroupName(command.name) : undefined;
    const ownerPromise = command.id == null ? this._userRepository.findById(new UserId(command.id)) : undefined;
    ownerPromise?.then(user => {
      const owner = user || undefined;
      this._groupRepository.save(this._groupFactory.create(id, name, owner));
    })
  }

  @Transaction()
  public delete(command: GroupDeleteCommand): void {
    const id = new GroupId(command.id);
    this._groupRepository.remove(id);
  }
}
