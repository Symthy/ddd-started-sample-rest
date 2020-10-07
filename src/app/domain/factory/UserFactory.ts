import { User } from "../User";
import { UserName } from "../UserName";
import { IUserFactory } from "./IUserFactory";

export class UserFactory implements IUserFactory {
  create(name: UserName): User {
    return new User(name);
  }
}
