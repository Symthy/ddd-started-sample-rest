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

  public async findById(id: GroupId): Promise<Group | null> {
    return this.dbcontext.findOne(id.value).then(groupModel => {
      if (groupModel == null) {
        return null;
      }
      return GroupModelConverter.toDomain(groupModel);
    });
  }

  public async find(group: Group): Promise<Array<Group>> {
    return this.dbcontext.find(GroupModelConverter.toModel(group))
      .then(groupModels => groupModels.map(model => GroupModelConverter.toDomain(model)));
  }

  public async findAll(): Promise<Array<Group>> {
    return this.dbcontext.find({
      select: ['id', 'name', 'owner', "members"]
    }).then(groupModels => groupModels.map(model => GroupModelConverter.toDomain(model)));
  }

  public async getNextId(): Promise<number> {
    return this.dbcontext.createQueryBuilder("groups")
      .select("MAX(groups.id)", "max").getRawOne().then(result => result + 1);
  }

  public async save(group: Group): Promise<Group> {
    const groupModelBuilder = new GroupModelBuilder();
    group.notify(groupModelBuilder);
    return this.dbcontext.save(groupModelBuilder.build())
      .then(groupModel => GroupModelConverter.toDomain(groupModel));
  }

  public async remove(id: GroupId): Promise<Group> {
    const groupModelBuilder = new GroupModelBuilder();
    groupModelBuilder.id(id);
    return this.dbcontext.remove(groupModelBuilder.build())
      .then(groupModel => GroupModelConverter.toDomain(groupModel));
  }
}
