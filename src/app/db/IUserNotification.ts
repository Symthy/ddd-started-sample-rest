import { UserId } from "#/domain/model/user/UserId";
import { UserName } from "#/domain/model/user/UserName";
import { UserType } from "#/domain/model/user/UserType";

export interface IUserNotification {
  id(id: UserId): void;
  name(name: UserName): void;
  type(type: UserType): void;
}
