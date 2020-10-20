import { GroupModel } from "#/db/entity/GroupModel";
import { GroupModelBuilder } from "#/db/GroupModelBuilder";
import { Group } from "#/domain/model/group/Group";
import { GroupId } from "#/domain/model/group/GroupId";
import { GroupData } from "#/dto/group/GroupData";
import { GroupDataList } from "#/dto/group/GroupDataList";
import { Repository } from "typeorm";
import { GroupModelConverter } from "../GroupModelConverter";
import { IGroupRepository } from "./IGroupRepository";

export class EFGroupRepository implements IGroupRepository {

  public constructor(private readonly dbcontext: Repository<GroupModel>) {
  }

  public async findById(id: GroupId): Promise<GroupData | null> {
    const group = this.dbcontext.findOne(id.value).then(result => {
      if (result == null) {
        return null;
      }
      return new GroupData(result);
    });
    return group;
  }

  public async find(group: Group): Promise<GroupDataList> {
    const groups = this.dbcontext.find(GroupModelConverter.toModel(group))
      .then(result => new GroupDataList(result));
    return groups;
  }

  public async findAll(): Promise<GroupDataList> {
    const groups = this.dbcontext.query(`SELECT * FROM groups`).then(result => { return result });
    return groups;
  }

  public async getNextId(): Promise<number> {
    return this.dbcontext.query(`SELECT * FROM groups WHERE id=(SELECT MAX(id) FROM groups)`);
  }

  public async save(group: Group): Promise<GroupData> {
    const groupModelBuilder = new GroupModelBuilder();
    group.notify(groupModelBuilder);
    const groupModel = groupModelBuilder.build();
    return this.dbcontext.save(groupModel).then(result => {
      return new GroupData(result);
    });
  }

  public async remove(id: GroupId): Promise<GroupData> {
    const groupModelBuilder = new GroupModelBuilder();
    groupModelBuilder.id(id);
    const groupModel = groupModelBuilder.build();
    return this.dbcontext.remove(groupModel).then(result => {
      return new GroupData(result);
    });
  }
}
