import { Group } from "#/domain/model/group/Group";
import { UserData } from "../user/UserData";
import { UserDataList } from "../user/UserDataList";

export class GroupData {
  private _id: number;
  private _name: string;
  private _owner: UserData;
  private _member: UserDataList;

  public constructor(source: Group) {
    this._id = source.id.value;
    this._name = source.name.value;
    this._owner = new UserData(source.owner);
    this._member = new UserDataList(source.members || []);
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get owner(): UserData {
    return this._owner;
  }
  public get member(): UserDataList {
    return this._member;
  }
}
