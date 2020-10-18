class GroupUpdateCommand {
  private _id: number;
  private _name?: string;
  private _ownerId?: number;

  public constructor(id: number, name?: string, ownerId?: number) {
    this._id = id;
    this._name = name;
    this._ownerId = ownerId;
  }

  public get id(): number { return this._id; }
  public get name(): string | undefined { return this._name; }
  public get ownerId(): number | undefined { return this._ownerId; }
}
