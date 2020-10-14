import { GroupId } from "#/domain/model/group/GroupId";

export class GroupFullException extends Error {

  public constructor(id: GroupId) {
    super();
  }
}
