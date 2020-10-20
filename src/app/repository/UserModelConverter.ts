import { UserModel } from "#/db/entity/UserModel";
import { User } from "#/domain/model/user/User";
import { UserId } from "#/domain/model/user/UserId";
import { UserName } from "#/domain/model/user/UserName";
import { transferType } from "#/domain/model/user/UserType";

export class UserModelConverter {
  public static toDomain(from: UserModel): User {
    return new User(
      new UserId(from.id),
      new UserName(from.name),
      transferType(from.type)
    );
  }
  public static transfer(from: User, to: UserModel) {
    to.id = from.id.value;
    to.name = from.name.value;
    to.type = from.type;
  }
  public static toModel(from: User): UserModel {
    return new UserModel(
      from.id.value,
      from.name.value,
      transferType(from.type)
    )
  }
}
