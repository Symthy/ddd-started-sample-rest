import { UserModel } from "#/db/entity/UserModel";
import { UserData } from "#/dto/user/UserData";
import { IUserRepository } from "#/repository/user/IUserRepository";
import { Inject } from "typedi/decorators/Inject";
import { OrmRepository } from "typeorm-typedi-extensions";
import { User } from "../model/user/User";
import { UserId } from "../model/user/UserId";
import { UserName } from "../model/user/UserName";
import { transferType, UserType } from "../model/user/UserType";

import { IUserFactory } from "./IUserFactory";

export class UserFactory implements IUserFactory {
  @OrmRepository(UserModel)
  private userRepository!: IUserRepository;

  async createDecideId(name: UserName): Promise<User> {
    const user = this.userRepository.getNextId().then(result => {
      const userId = new UserId(result)
      return new User(userId, name);
    });
    return user;
  }

  create(id: UserId, name?: UserName, type?: UserType): User {
    return new User(id, name, type);
  }

  createFromModel(model: UserData) {
    const { id, name, type } = model;
    return new User(new UserId(id), new UserName(name), transferType(type));
  }
}
