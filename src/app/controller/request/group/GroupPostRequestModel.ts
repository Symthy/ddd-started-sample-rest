export class GroupPostRequestModel {
  public constructor(private _groupid: number, private _name: string, private _ownerId: number) {
  }
  public get groupId(): number {
    return this._groupid;
  }
  public get name(): string {
    return this._name
  }
  public get ownerId(): number {
    return this._groupid;
  }
}
