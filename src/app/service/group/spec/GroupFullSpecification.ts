import { UserModel } from "#/db/entity/UserModel";
import { UserModelBuilder } from "#/db/UserModelBuilder";
import { Group } from "#/domain/model/group/Group";
import { IUserRepository } from "#/repository/user/IUserRepository";

export class GroupFullSpecification {
  constructor(private readonly _userRepository: IUserRepository) {
  }

  public isSatisfiedBy(group: Group): Promise<boolean> {
    return this._userRepository.find(group.members).then(userList => {
      const premiumUserNum = userList.users.filter(user => user.type === "Premium").length;
      const groupUpperLimit = premiumUserNum < 10 ? 30 : 50;
      return group.members.length >= groupUpperLimit;
    });
  }
}
