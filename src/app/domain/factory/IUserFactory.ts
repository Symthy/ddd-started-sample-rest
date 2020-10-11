import { User } from "../User";
import { UserName } from "../UserName";
import { UserType } from "../UserType";

export interface IUserFactory {
  create(name: UserName, type?: UserType): Promise<User>;
}
