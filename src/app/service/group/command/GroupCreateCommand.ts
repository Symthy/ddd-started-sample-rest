export class GroupCreateCommand {
  constructor(private _ownerId: number, private _name: string) {
  }
  public get ownerId(): number {
    return this._ownerId;
  }
  public get name(): string {
    return this._name;
  }
}
