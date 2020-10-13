import { IUserFactory } from "#/domain/factory/IUserFactory";
import { UserService } from "#/domain/service/UserService";
import { UserName } from "#/domain/UserName";
import { transferType } from "#/domain/UserType";
import { Inject } from "typedi/decorators/Inject";
import { Transaction } from "typeorm";
import { UserId } from "../domain/UserId";
import { UserRegisterCommand } from "./command/UserRegisterCommand";
import { UserData } from "../dto/UserData";
import { UserDataList } from "../dto/UserDataList";
import { IUserRepository } from "../repository/IUserRepository";

export class UserApplicationService {
  private readonly userFactory: IUserFactory
  @Inject()
  private readonly userRepository!: IUserRepository
  private readonly userService: UserService

  public constructor(userFactory: IUserFactory, userService: UserService) {
    this.userFactory = userFactory;
    this.userService = userService;
  }

  public get(command: UserGetCommand): Promise<UserData | null> {
    const id = new UserId(command.id);
    return this.userRepository.findById(id);
  }

  public getAll(): Promise<UserDataList> {
    return this.userRepository.findAll();
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
