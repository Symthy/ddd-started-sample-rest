import { IUserNotification } from "#/db/IUserNotification";
import { ArgumentNullException } from "#/exception/ArgumentNullException";
import { NonExsitIdException } from "#/exception/NonExsitIdException";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {
  private _type: UserType;
  public constructor(private readonly _id: UserId, private _name: UserName, _type?: UserType extends string ? UserType : undefined) {
    if (_id === undefined) {
      throw new ArgumentNullException("id");
    }
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
    // 内部データを非公開のまま外部に引き渡すためのもの
    note.id(this.id);
    note.name(this.name);
    note.type(this.type)
  }
}
