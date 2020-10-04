import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {

  public constructor(private _id: UserId, private _name?: UserName, private _type?: UserType extends string? UserType: undefined) {
  }

  public get id(): UserId {
    return this._id;
  }
  public get name(): UserName | undefined {
    return this._name;
  }
  public set name(name: UserName | undefined) {
    this._name = name;
  }
  public get type(): UserType | undefined {
    return this._type;
  }
  public set type(type: UserType | undefined) {
    this._type = type;
  }

}
