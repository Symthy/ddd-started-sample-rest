import { GroupModel } from "#/db/entity/GroupModel";
import { UserDataList } from "../user/UserDataList";

export class GroupData {
  private _id: number;
  private _name: string;
  private _ownerId: number;
  private _member: UserDataList;

  public constructor(source: GroupModel) {
    this._id = source.id;
    this._name = source.name;
    this._ownerId = source.owner;
    this._member = new UserDataList(source.member ? source.member : []);
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get ownerId(): number {
    return this._ownerId;
  }
  public get member(): UserDataList {
    return this._member;
  }
}
