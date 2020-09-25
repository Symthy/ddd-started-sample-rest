import { User } from "../../domain/User";

export class UserGetResponseModel {
  public constructor(private _user: User) {
  }

  public get user(): User {
    return this._user;
  }
}
