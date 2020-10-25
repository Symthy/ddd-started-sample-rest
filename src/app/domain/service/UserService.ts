import { UserModel } from "#/db/entity/UserModel";
import { IUserRepository } from "#/repository/user/IUserRepository";
import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import { User } from "../model/user/User";

@Service()
export class UserService {
  @OrmRepository(UserModel)
  private _userRepository!: IUserRepository;

  public exists(user: User): boolean {
    const duplicatedUser = this._userRepository.find(user);
    return duplicatedUser != null;
  }
}
