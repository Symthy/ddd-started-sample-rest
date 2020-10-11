import { IUserRepository } from "#/service/repository/IUserRepository";
import { User } from "../User";
import { UserId } from "../UserId";
import { UserName } from "../UserName";
import { UserType } from "../UserType";
import { IUserFactory } from "./IUserFactory";

export class UserFactory implements IUserFactory {
  private userRepository!: IUserRepository;
  async create(name: UserName): Promise<User> {
    const user = this.userRepository.getNextId().then(result => {
      const userId = new UserId(result)
      return new User(userId, name);
    });
    return user;
  }
}
