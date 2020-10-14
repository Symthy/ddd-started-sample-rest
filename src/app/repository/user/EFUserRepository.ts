import { UserModel } from "#/db/entity/UserModel";
import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { UserDataModelBuilder } from "#/db/UserModelBuilder";
import { UserId } from "#/domain/model/user/UserId";
import { User } from "#/domain/model/user/User";
import { transferType } from "#/domain/model/user/UserType";
import { UserName } from "#/domain/model/user/UserName";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly dbcontext: Repository<UserModel>) {
  }

  public async findById(id: UserId): Promise<UserData | null> {
    const user = this.dbcontext.findOne(id.value).then(result => {
      if (result === undefined) {
        return null;
      }
      return new UserData(result);
    });
    return user;
  }

  public async find(user: UserModel): Promise<UserDataList> {
    const users = this.dbcontext.find(user).then(result => { return new UserDataList(result) });
    return users;
  }

  public async findAll(): Promise<UserDataList> {
    const users = this.dbcontext.query(`SELECT * FROM USERS`).then(result => { return result });
    return users;
  }

  public async getNextId(): Promise<number> {
    return this.dbcontext.query(`SELECT * FROM users WHERE id=(SELECT MAX(id) FROM users)`);
  }

  public async save(user: User): Promise<UserData> {
    const userModelBuilder = new UserDataModelBuilder();
    user.notify(userModelBuilder);
    const userModel = userModelBuilder.build();
    return this.dbcontext.save(userModel).then(result => {
      return new UserData(result);
     });
  }

  public async remove(user: User): Promise<UserData> {
    const userModelBuilder = new UserDataModelBuilder();
    user.notify(userModelBuilder);
    const userModel = userModelBuilder.build();
    return this.dbcontext.remove(userModel).then(result => {
      return new UserData(result);
    });
  }

  private toDomain(from: UserModel): User {
    return new User(
      new UserId(from.id),
      new UserName(from.name),
      transferType(from.type)
    )
  }
  private transfer(from: User, to: UserModel) {
    to.id = from.id.value;
    to.name = from.name.value;
    to.type = from.type;
  }
  private toDataModel(from: User): UserModel {
    return new UserModel(
      from.id.value,
      from.name.value,
      transferType(from.type)
    )
  }
}
