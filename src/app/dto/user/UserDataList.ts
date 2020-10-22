import { User } from "#/domain/model/user/User";
import { UserData } from "./UserData";

export class UserDataList {
  private _users: Array<UserData>;

  public constructor(source: Array<User>) {
    this._users = [];
    for (const user of source) {
      this._users.push(new UserData(user));
    }
  }

  public get users(): Array<UserData> {
    return this._users;
  }
}
