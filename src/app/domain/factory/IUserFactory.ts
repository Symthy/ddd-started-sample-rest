import { User } from "../User";
import { UserId } from "../UserId";
import { UserName } from "../UserName";
import { UserType } from "../UserType";

export interface IUserFactory {
  createDecideId(name: UserName, type?: UserType): Promise<User>;
  create(id: UserId, name?: UserName, type?: UserType): User;
}
