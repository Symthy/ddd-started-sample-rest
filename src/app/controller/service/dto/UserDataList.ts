import { UserDao } from "#/db/entity/UserDao";
import { UserData } from "./UserData";

export class UserDataList {
  private _users: Array<UserData>;

  public constructor(source: Array<UserDao>) {
    this._users = [];
    for (const user of source) {
      this._users.push(new UserData(user));
    }
  }

  public get users(): Array<UserData> {
    return this._users;
  }
}
