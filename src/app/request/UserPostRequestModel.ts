export class UserPostRequestModel {
  private _id!: number;
  private _name!: string;
  private _type?: string;
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
