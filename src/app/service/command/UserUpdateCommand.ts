class UserUpdateCommand {
  private _id: number;
  private _name?: string;
  private _type?: string;

  public constructor(id: number, name: string, type?: string) {
    this._id = id;
    this._name = name;
    this._type = type;
  }

  public get id(): number { return this._id; }
  public get name(): string | undefined { return this._name; }
  public get type(): string | undefined { return this._type; }
}
