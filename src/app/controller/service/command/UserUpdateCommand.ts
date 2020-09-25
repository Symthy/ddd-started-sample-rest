class UserUpdateCommand {
  private _id: string;
  private _name: string | null;
  private _type: string | null;

  public constructor(id: string, name: string | null = null, type: string | null = null) {
    this._id = id;
    this._name = name;
    this._type = type;
  }

  public get id(): string { return this._id; }
  public get name(): string | null { return this._name; }
  public set name(name: string | null) { this._name = name; }
  public get type(): string | null { return this._type; }
  public set type(type: string | null) { this._type = type; }
}
