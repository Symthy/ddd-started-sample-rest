class UserPutRequestModel {
  private _name!: string;
  private _type?: string;

  public get name(): string {
    return this._name;
  }
  public get type(): string | undefined {
    return this._type;
  }
}
