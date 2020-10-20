import { GroupModel } from "#/db/entity/GroupModel";
import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupName } from "#/domain/model/group/GroupName";
import { UserModelConverter } from "./UserModelConverter";

export class GroupModelConverter {
  public static toDomain(from: GroupModel): Group {
    return new Group(
      new GroupId(from.id),
      new GroupName(from.name),
      UserModelConverter.toDomain(from.owner),
      from.members?.map(user => UserModelConverter.toDomain(user))
    );
  }
  public static transfer(from: Group, to: GroupModel) {
    to.id = from.id.value;
    to.name = from.name.value;
    to.owner = UserModelConverter.toModel(from.owner);
    to.members = from.members.map(user => UserModelConverter.toModel(user));
  }
  public static toModel(from: Group): GroupModel {
    return new GroupModel(
      from.id.value,
      from.name.value,
      UserModelConverter.toModel(from.owner),
      from.members.map(user => UserModelConverter.toModel(user))
    );
  }
}
