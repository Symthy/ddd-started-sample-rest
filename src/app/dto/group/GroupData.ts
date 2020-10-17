import { GroupModel } from "#/db/entity/GroupModel";
import { UserData } from "../user/UserData";
import { UserDataList } from "../user/UserDataList";

export class GroupData {
  private _id: number;
  private _name: string;
  private _owner: UserData;
  private _member: UserDataList;

  public constructor(source: GroupModel) {
    this._id = source.id;
    this._name = source.name;
    this._owner = new UserData(source.owner);
    this._member = new UserDataList(source.member || []);
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
