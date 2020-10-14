import { ArgumentNullException } from "#/exception/ArgumentNullException";
import { GroupFullException } from "#/exception/GroupFullException";
import { User } from "../user/User";
import { GroupId } from "./GroupId";
import { GroupName } from "./GroupName";

export class Group {
  private _id: GroupId;
  private _name: GroupName;
  private _owner: User;
  private _members: Array<User>;

  public constructor(id: GroupId, name: GroupName, owner: User, members: Array<User>) {
    if (id == null) throw new ArgumentNullException(id);
    if (name == null) throw new ArgumentNullException(name);
    if (owner == null) throw new ArgumentNullException(owner);
    if (members == null) throw new ArgumentNullException(members);
    this._id = id;
    this._name = name;
    this._owner = owner;
    this._members = members
  }

  public get id(): GroupId {
    return this._id;
  }
  public get name(): GroupName {
    return this._name;
  }
  public get owner(): User {
    return this._owner;
  }
  public get members(): Array<User> {
    return this._members;
  }

  public isFull() { // 集約
    return this.members.length >= 29;
  }

  public join(user: User): void {
    if (user == null) {
      throw new ArgumentNullException(user);
    }
    if (this.isFull()) {
      throw new GroupFullException(this.id);
    }
    this._members.push(user);
  }
}
