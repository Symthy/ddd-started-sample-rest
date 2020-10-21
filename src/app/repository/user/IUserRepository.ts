
import { User } from "#/domain/model/user/User";
import { UserId } from "#/domain/model/user/UserId";

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  find(user: User): Promise<Array<User>>;
  findMulti(users: Array<User>): Promise<Array<User>>;
  findAll(): Promise<Array<User>>;
  getNextId(): Promise<number>;
  save(user: User): Promise<User>;
  remove(user: User): Promise<User>;
}
