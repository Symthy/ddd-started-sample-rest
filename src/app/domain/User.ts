import { IUserNotification } from "#/db/IUserNotification";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserType } from "./UserType";

export class User {
  private _id!: UserId;

  public constructor(private _name: UserName, private _type?: UserType extends string? UserType: undefined) {
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
  public get type(): UserType | undefined {
    return this._type;
  }
  public set type(type: UserType | undefined) {
    this._type = type;
  }

  public notify(note: IUserNotification) {
    note.id(this._id);
    note.name(this._name);
  }
}
