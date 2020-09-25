import { User } from "#/public/scripts/domain/User";

export class UserGetResult {
  public constructor(private _user: User) {
  }
  public get user(): User {
    return this._user;
  }
}
