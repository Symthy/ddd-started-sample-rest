import { User } from "../model/user/User";
import { UserId } from "../model/user/UserId";
import { UserName } from "../model/user/UserName";
import { UserType } from "../model/user/UserType";

export interface IUserFactory {
  createDecideId(name: UserName, type?: UserType): Promise<User>;
  create(id: UserId, name?: UserName, type?: UserType): User;
}
