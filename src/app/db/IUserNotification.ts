import { UserId } from "#/domain/UserId";
import { UserName } from "#/domain/UserName";

export interface IUserNotification {
  id(id: UserId): void;
  name(name: UserName): void;
}
