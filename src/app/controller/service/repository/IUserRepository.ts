import { User } from "#/public/scripts/domain/User";
import { UserId } from "app/domain/UserId";

export interface IUserRepository {
  findById(id: UserId): User;
}
