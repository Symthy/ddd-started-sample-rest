import { User } from "#/public/scripts/domain/User";

export class UserGetAllResult {
  public constructor(private _users: Array<User>) {
  }

  public get users() {
    return this._users;
  }
}
