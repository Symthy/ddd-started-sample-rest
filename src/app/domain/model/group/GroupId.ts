import { ArgumentNullException } from "#/exception/ArgumentNullException";

export class GroupId {
  private _value: number;
  public constructor(value: number) {
    if (value == null) throw new ArgumentNullException(value);
    this._value = value;
  }
  public get value(): number {
    return this._value;
  }
}
