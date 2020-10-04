import { User } from "app/domain/User";

class UserData {
  private _id: number;
  private _name: string | undefined;

  public constructor(source: User) {
    this._id = source.id.value;
    this._name = source.name?.value;
  }

  public get id(): number { return this._id; }
  public get name(): string |undefined { return this._name; }
}
