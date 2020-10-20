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

  public async findById(id: UserId): Promise<UserData | null> {
    const user = this.dbcontext.findOne(id.value).then(result => {
      if (result == null) {
        return null;
      }
      return new UserData(result);
    });
    return user;
  }

  public async find(user: User): Promise<UserDataList> {
    const users = this.dbcontext.find(UserModelConverter.toModel(user))
      .then(result => new UserDataList(result));
    return users;
  }

  public async findMulti(users: Array<User>): Promise<UserDataList> {
    const userIds = users.map(user => {
      return user.id;
    })
    return this.dbcontext.findByIds(userIds).then(userModels => {
      return new UserDataList(userModels);
    })
  }

  public async findAll(): Promise<UserDataList> {
    const users = this.dbcontext.query(`SELECT * FROM USERS`).then(result => { return result });
    return users;
  }

  public async getNextId(): Promise<number> {
    return this.dbcontext.query(`SELECT * FROM users WHERE id=(SELECT MAX(id) FROM users)`);
  }

  public async save(user: User): Promise<UserData> {
    const userModelBuilder = new UserModelBuilder();
    user.notify(userModelBuilder);
    const userModel = userModelBuilder.build();
    return this.dbcontext.save(userModel).then(result => {
      return new UserData(result);
     });
  }

  public async remove(user: User): Promise<UserData> {
    const userModelBuilder = new UserModelBuilder();
    user.notify(userModelBuilder);
    const userModel = userModelBuilder.build();
    return this.dbcontext.remove(userModel).then(result => {
      return new UserData(result);
    });
  }
}
