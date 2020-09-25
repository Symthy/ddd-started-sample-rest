import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {

  public constructor(private _id: UserId, private _name: UserName, private _type: UserType) {
  }

  public get id(): UserId {
    return this._id;
  }
  public get name(): UserName {
    return this._name;
  }
  public set name(name: UserName) {
    this._name = name;
  }
  public get type(): UserType {
    return this._type;
  }
  public set type(type: UserType) {
    this._type = type;
  }


}
