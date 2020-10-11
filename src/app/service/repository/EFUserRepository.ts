import { User } from "app/domain/User";
import { UserId } from "app/domain/UserId";
import { UserName } from "app/domain/UserName";
import { transferType } from "app/domain/UserType";
import { UserModel } from "#/db/entity/UserModel";
import { DeleteQueryBuilder, Repository, Transaction } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { UserData } from "../dto/UserData";
import { UserDataList } from "../dto/UserDataList";
import { UserDataModelBuilder } from "#/db/UserModelBuilder";

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

  @Transaction()
  public async save(user: User): Promise<UserData> {
    const userModelBuilder = new UserDataModelBuilder();
    user.notify(userModelBuilder);
    const userModel = userModelBuilder.build();
    return this.dbcontext.save(userModel).then(result => {
      return new UserData(result);
     });
  }
}
