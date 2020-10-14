class UserDeleteCommand {
  constructor(private readonly _id: number) {
  }
  public get id(): number {
    return this._id;
  }
}
