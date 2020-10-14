import { IUserRepository } from "#/repository/user/IUserRepository";
import { User } from "../model/user/User";
import { UserId } from "../model/user/UserId";
import { UserName } from "../model/user/UserName";
import { UserType } from "../model/user/UserType";

import { IUserFactory } from "./IUserFactory";

export class UserFactory implements IUserFactory {
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
}
