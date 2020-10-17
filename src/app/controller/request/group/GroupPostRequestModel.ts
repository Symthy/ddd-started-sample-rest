export class GroupPostRequestModel {
  private _id?: number;
  private _name!: string;
  private _ownerId!: number;
  public get id(): number | undefined {
    return this._id;
  }
  public get name(): string {
    return this._name
  }
  public get ownerId(): number {
    return this._ownerId;
  }
}
