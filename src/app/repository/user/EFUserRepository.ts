import { UserModel } from "#/db/entity/UserModel";
import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { UserModelBuilder } from "#/db/UserModelBuilder";
import { UserId } from "#/domain/model/user/UserId";
import { User } from "#/domain/model/user/User";
import { transferType } from "#/domain/model/user/UserType";
import { UserName } from "#/domain/model/user/UserName";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";
import { UserModelConverter } from "../UserModelConverter";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly dbcontext: Repository<UserModel>) {
  }

  public async findById(id: UserId): Promise<User | null> {
    return this.dbcontext.findOne(id.value).then(userModel => {
      if (userModel == null) {
        return null;
      }
      return UserModelConverter.toDomain(userModel);
    });
  }

  public async find(user: User): Promise<Array<User>> {
    return this.dbcontext.find(UserModelConverter.toModel(user))
      .then(userModels => userModels.map(model => UserModelConverter.toDomain(model)));
  }

  public async findMulti(users: Array<User>): Promise<Array<User>> {
    const userIds = users.map(user => user.id);
    return this.dbcontext.findByIds(userIds)
      .then(userModels => userModels.map(model => UserModelConverter.toDomain(model)));
  }

  public async findAll(): Promise<Array<User>> {
    return this.dbcontext.find({
      select: ['id', 'name', 'type']
    }).then(userModels => userModels.map(model => UserModelConverter.toDomain(model)));
  }

  public async getNextId(): Promise<number> {
    return this.dbcontext.createQueryBuilder("users")
      .select("MAX(users.id)", "max").getRawOne().then(result => result + 1);
  }

  public async save(user: User): Promise<User> {
    const userModelBuilder = new UserModelBuilder();
    user.notify(userModelBuilder);

    return this.dbcontext.save(userModelBuilder.build())
      .then(model => UserModelConverter.toDomain(model));
  }

  public async remove(user: User): Promise<User> {
    const userModelBuilder = new UserModelBuilder();
    user.notify(userModelBuilder);
    return this.dbcontext.remove(userModelBuilder.build())
      .then(model => UserModelConverter.toDomain(model));
  }
}
