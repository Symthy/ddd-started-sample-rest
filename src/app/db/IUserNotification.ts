import { UserId } from "#/domain/UserId";
import { UserName } from "#/domain/UserName";
import { UserType } from "#/domain/UserType";

export interface IUserNotification {
  id(id: UserId): void;
  name(name: UserName): void;
  type(type: UserType): void;
}
