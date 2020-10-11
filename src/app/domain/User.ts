import { IUserNotification } from "#/db/IUserNotification";
import { ArgumentNullException } from "#/exception/ArgumentNullException";
import { NonExsitIdException } from "#/exception/NonExsitIdException";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {
  private _type: UserType;
  public constructor(private _name: UserName, private readonly _id?: UserId, _type?: UserType extends string ? UserType : undefined) {
    if (_name === undefined) {
      throw new ArgumentNullException("name");
    }
    if (_type === undefined) {
      this._type = "Normal";
    } else {
      this._type = _type;
    }
  }

  public get id(): UserId | never {
    if (this._id) {
      return this._id;
    }
    throw new NonExsitIdException();
  }
  public get name(): UserName {
    return this._name;
  }
  public get type(): UserType {
    return this._type;
  }
  public set type(_type: UserType) {
    this._type = _type;
  }

  public notify(note: IUserNotification) {
    note.id(this.id);
    note.name(this.name);
  }
}
