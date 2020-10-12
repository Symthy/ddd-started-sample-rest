import { IUserFactory } from "#/domain/factory/IUserFactory";
import { UserService } from "#/domain/service/UserService";
import { UserName } from "#/domain/UserName";
import { Inject } from "typedi/decorators/Inject";
import { UserId } from "../domain/UserId";
import { UserRegisterCommand } from "./command/UserRegisterCommand";
import { UserData } from "./dto/UserData";
import { UserDataList } from "./dto/UserDataList";
import { IUserRepository } from "./repository/IUserRepository";

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

  public register(command: UserRegisterCommand): void {
    const name = new UserName(command.name);
    const user = this.userFactory.createDecideId(name);
    user.then(result => this.userRepository.save(result));
  }

  public update(command: UserUpdateCommand): void {
    const id = new UserId(command.id);
    const name = command.name ? new UserName(command.name) : undefined;
    this.userRepository.save(this.userFactory.create(id, name, command.type));
  }
}
