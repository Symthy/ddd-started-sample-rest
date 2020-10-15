export class GroupJoinCommand {
  public constructor(private _userId: number, private _groupId: number) {
  }
  public get userId(): number {
    return this._userId;
  }
  public get groupId(): number {
    return this._groupId;
  }
}
