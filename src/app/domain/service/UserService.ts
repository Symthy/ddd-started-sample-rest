import { UserDataModelBuilder } from "#/db/UserModelBuilder";
import { IUserRepository } from "#/repository/user/IUserRepository";
import { User } from "../model/user/User";


export class UserService {
  public constructor(private _userRepository: IUserRepository) {
  }

  public exists(user: User): boolean {
    const builder = new UserDataModelBuilder();
    const duplicatedUser = this._userRepository.find(builder.build());
    return duplicatedUser != null;
  }
}
