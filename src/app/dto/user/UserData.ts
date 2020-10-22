import { User } from "#/domain/model/user/User";

export class UserData {
  private _id: number;
  private _name: string;
  private _type?: string;

  public constructor(source: User) {
    this._id = source.id.value;
    this._name = source.name.value;
    this._type = source.type;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get type(): string | undefined {
    return this._type;
  }
}
