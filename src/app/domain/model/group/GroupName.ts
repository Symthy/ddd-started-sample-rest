import { ArgumentException } from "#/exception/ArgumentException";
import { ArgumentNullException } from "#/exception/ArgumentNullException";

export class GroupName {
  private _value: string;
  public constructor(value: string) {
    if (value == null) throw new ArgumentNullException(value);
    if (value.length < 3) throw new ArgumentException("名前が3文字以下です。", value);
    if (value.length > 20) throw new ArgumentException("名前が20文字以上です。", value);
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
  public equals(other: GroupName): boolean {
    if (other == null) return false;
    if (this == null) return true;
    if (this.value === other.value) return true;
    return false;
  }
}
