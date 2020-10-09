import { UserId } from "#/domain/UserId";
import { UserName } from "#/domain/UserName";
import { UserType } from "#/domain/UserType";
import { UserModel } from "./entity/UserModel";
import { IUserNotification } from "./IUserNotification";

export class UserDataModelBuilder implements IUserNotification {
  private _id?: UserId;
  private _name?: UserName;
  private _type?: UserType;

  public id(id: UserId) {
    this._id = id;
  }
  public name(name: UserName) {
    this._name = name;
  }
  public type(type: UserType) {
    this._type = type;
  }
  public build(): UserModel {
    return new UserModel(this._id?.value, this._name?.value, this._type ? this._type : "");
  }
}
