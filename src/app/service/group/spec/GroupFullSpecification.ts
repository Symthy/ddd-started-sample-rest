import { Group } from "#/domain/model/group/Group";
import { IUserRepository } from "#/repository/user/IUserRepository";

export class GroupFullSpecification {
  constructor(private readonly _userRepository: IUserRepository) {
  }

  public isSatisfiedBy(group: Group): Promise<boolean> {
    return this._userRepository.findMulti(group.members).then(models => {
      const premiumUserNum = models.filter(user => user.type === "Premium").length;
      const groupUpperLimit = premiumUserNum < 10 ? 30 : 50;
      return group.members.length >= groupUpperLimit;
    });
  }
}
