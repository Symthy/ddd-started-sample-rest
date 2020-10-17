import { IUserNotification } from "#/db/IUserNotification";
import { ArgumentNullException } from "#/exception/ArgumentNullException";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {
  private readonly _id: UserId;
  private _name: UserName;
  private _type: UserType;
  public constructor(id?: UserId, name?: UserName, type?: UserType extends string ? UserType : undefined) {
    if (!id) throw new ArgumentNullException("id");
    if (!name) throw new ArgumentNullException("name");
    this._id = id;
    this._name = name;
    if (type) {
      this._type = type;
    } else {
      this._type = "Normal";
    }
  }

  public get id(): UserId {
    return this._id;
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
