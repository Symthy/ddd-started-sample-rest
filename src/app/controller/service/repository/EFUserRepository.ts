import { User } from "app/domain/User";
import { UserId } from "app/domain/UserId";
import { UserName } from "app/domain/UserName";
import { transferType } from "app/domain/UserType";
import { UserDao } from "app/db/entity/UserDao";
import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { UserData } from "../dto/UserData";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly dbcontext: Repository<UserDao>) {
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

  public async findAll(): Promise<UserDataList> {
    const users = this.dbcontext.query(`SELECT * FROM USERS`).then(result => { return result });
    return users;
  }
}
