import { IUserRepository } from "#/repository/IUserRepository";
import { User } from "../User";
import { UserId } from "../UserId";
import { UserName } from "../UserName";
import { UserType } from "../UserType";
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
