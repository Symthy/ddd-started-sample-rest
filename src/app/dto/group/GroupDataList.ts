import { Group } from "#/domain/model/group/Group";
import { GroupData } from "./GroupData";

export class GroupDataList {
  private _groups: Array<GroupData>;

  public constructor(source: Array<Group>) {
    this._groups = [];
    for (const group of source) {
      this._groups.push(new GroupData(group));
    }
  }

  public get users(): Array<GroupData> {
    return this._groups;
  }
}
