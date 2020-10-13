import { UserPostRequestModel } from "#/controller/request/UserPostRequestModel";

export class UserRegisterCommand {
  private _id?: number;
  private _name: string;
  private _type?: string;
  public constructor(user: UserPostRequestModel) {
    this._id = user.id;
    this._name = user.name;
    this._type = user.type;
  }

  public get id(): number | undefined {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get type(): string | undefined {
    return this._type;
  }
}
