export class GroupPutRequestModel {
  constructor(private _name?: string, private _ownerId?: number, private _memberIds?: Array<number>) {
  }
  public get name(): string | undefined {
    return this._name;
  }
  public get ownerId(): number | undefined {
    return this._ownerId;
  }
  public get memberIds(): Array<number> | undefined {
    return this._memberIds
  }
}
