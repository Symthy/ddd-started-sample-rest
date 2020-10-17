export class GroupCreateCommand {
  constructor(private _name: string, private _ownerId: number) {
  }
  public get name(): string {
    return this._name;
  }
  public get ownerId(): number {
    return this._ownerId;
  }
}
