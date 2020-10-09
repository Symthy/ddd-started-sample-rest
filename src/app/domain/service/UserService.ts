import { UserModel } from "#/db/entity/UserModel";
import { UserDataModelBuilder } from "#/db/UserModelBuilder";
import { IUserRepository } from "#/service/repository/IUserRepository";
import { User } from "../User";

export class UserService {
  public constructor(private _userRepository: IUserRepository) {
  }

  public exists(user: User): boolean {
    const builder = new UserDataModelBuilder();
    const duplicatedUser = this._userRepository.find(builder.build());
    return duplicatedUser != null;
  }
}
