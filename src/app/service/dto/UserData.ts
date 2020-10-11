import { UserModel } from "#/db/entity/UserModel";

export class UserData {
  private _id: number;
  private _name?: string;
  private _type?: string;

  public constructor(source: UserModel) {
    this._id = source.id;
    this._name = source.name;
    this._type = source.type;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string | undefined {
    return this._name;
  }
  public get type(): string | undefined {
    return this._type;
  }
}
