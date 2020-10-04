import { UserDao } from "app/entity/UserDao";
import { Inject } from "typedi/decorators/Inject";
import { Repository } from "typeorm";
import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { IUserRepository } from "./repository/IUserRepository";
import { UserGetAllResult } from "./result/UserGetAllResult";
import { UserGetResult } from "./result/UserGetResult";

export class UserApplicationService {
  private readonly userFactory: IUserFactory
  @Inject()
  private readonly userRepository!: IUserRepository
  private readonly userService: UserService

  public constructor(userFactory: IUserFactory, userService: UserService) {
    this.userFactory = userFactory;
    this.userService = userService;
  }

  public get(command: UserGetCommand): UserGetResult {
    const id = new UserId(command.id);
    const user = this.userRepository.find(id);
    const result = new UserGetResult(user);
    return result;
  }

  public getAll(): UserGetAllResult {
    const result = new UserGetAllResult(new Array<User>());
    return result;
  }
}
