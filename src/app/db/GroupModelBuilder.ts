import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";
import { User } from "#/domain/model/user/User";
import { GroupModel } from "./entity/GroupModel";
import { UserModel } from "./entity/UserModel";
import { IGroupNotification } from "./IGroupNotification";
import { UserModelBuilder } from "./UserModelBuilder";

export class GroupModelBuilder implements IGroupNotification {
  private _id?: GroupId;
  private _name?: GroupName;
  private _owner?: User;
  private _members?: Array<User>;

  public id(id: GroupId) {
    this._id = id;
  }
  public name(name: GroupName) {
    this._name = name;
  }
  public owner(owner: User) {
    this._owner = owner;
  }
  public members(members: Array<User>) {
    this._members = members;
  }
  public build(): GroupModel {

    return new GroupModel(
      this._id?.value,
      this._name?.value,
      this._owner ? this.userBuild(this._owner) : undefined,
      this._members?.map(user => this.userBuild(user)));
  }

  private userBuild(user: User): UserModel {
    const userBuilder = new UserModelBuilder();
    userBuilder.id(user.id);
    userBuilder.name(user.name);
    userBuilder.type(user.type);
    return userBuilder.build()
  }
}
