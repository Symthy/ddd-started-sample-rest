import { UserId } from "#/domain/UserId";
import { UserName } from "#/domain/UserName";
import { UserModel } from "./entity/UserModel";
import { IUserNotification } from "./IUserNotification";

export class UserDataModelBuilder implements IUserNotification {
  private _id?: UserId;
  private _name?: UserName;

  public id(id: UserId) {
    this._id = id;
  }
  public name(name: UserName) {
    this._name = name;
  }
  public build(): UserModel {
    return new UserModel();
  }
}
