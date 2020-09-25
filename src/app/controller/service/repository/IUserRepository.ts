import { User } from "#/public/scripts/domain/User";

export interface IUserRepository {
  find(id: UserId): User;
}
