import { UserModel } from "#/db/entity/UserModel";
import { IUserFactory } from "#/domain/factory/IUserFactory";
import { UserId } from "#/domain/model/user/UserId";
import { UserName } from "#/domain/model/user/UserName";
import { transferType } from "#/domain/model/user/UserType";
import { UserService } from "#/domain/service/UserService";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";
import { IUserRepository } from "#/repository/user/IUserRepository";
import { Inject } from "typedi/decorators/Inject";
import { Service } from "typedi/decorators/Service";
import { Transaction } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { UserRegisterCommand } from "./command/UserRegisterCommand";

@Service('user.service')
export class UserApplicationService {

  private readonly userFactory: IUserFactory
  @OrmRepository(UserModel)
  private readonly userRepository!: IUserRepository
  @Inject()
  private readonly userService!: UserService

  public constructor(userFactory: IUserFactory) {
    this.userFactory = userFactory;
  }

  public get(command: UserGetCommand): Promise<UserData | null> {
    const id = new UserId(command.id);
    return this.userRepository.findById(id).then(user => {
      return user == null ? null : new UserData(user);
    });
  }

  public getAll(): Promise<UserDataList> {
    return this.userRepository.findAll().then(users => new UserDataList(users));
  }

  @Transaction()
  public register(command: UserRegisterCommand): void {
    const name = new UserName(command.name);
    const user = this.userFactory.createDecideId(name);
    user.then(result => this.userRepository.save(result));
  }

  @Transaction()
  public update(command: UserUpdateCommand): void {
    const id = new UserId(command.id);
    const name = command.name ? new UserName(command.name) : undefined;
    this.userRepository.save(this.userFactory.create(id, name, transferType(command.type)));
  }

  @Transaction()
  public delete(command: UserDeleteCommand): void {
    const id = new UserId(command.id);
    this.userRepository.remove(this.userFactory.create(id));
  }
}
