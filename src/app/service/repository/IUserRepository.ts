
import { UserModel } from "#/db/entity/UserModel";
import { User } from "#/domain/User";
import { UserId } from "app/domain/UserId";
import { UserData } from "../dto/UserData";
import { UserDataList } from "../dto/UserDataList";

export interface IUserRepository {
  findById(id: UserId): Promise<UserData | null>;
  find(user: UserModel): Promise<UserDataList>;
  findAll(): Promise<UserDataList>;
  getNextId(): Promise<number>;
  save(user: User): void;
}
