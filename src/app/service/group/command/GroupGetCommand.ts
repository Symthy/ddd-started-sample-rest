class GroupGetCommand {
  public constructor(private _id: number) {
  }

  public get id(): number {
    return this._id;
  }
}
