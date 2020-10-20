
import { UserModel } from "#/db/entity/UserModel";
import { User } from "#/domain/model/user/User";
import { UserId } from "#/domain/model/user/UserId";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";

export interface IUserRepository {
  findById(id: UserId): Promise<UserData | null>;
  find(user: User): Promise<UserDataList>;
  findMulti(users: Array<User>): Promise<UserDataList>;
  findAll(): Promise<UserDataList>;
  getNextId(): Promise<number>;
  save(user: User): Promise<UserData>;
  remove(user: User): Promise<UserData>;
}
