import { User } from "app/domain/User";
import { UserId } from "app/domain/UserId";
import { UserName } from "app/domain/UserName";
import { transferType } from "app/domain/UserType";
import { UserDao } from "app/db/entity/UserDao";
import { Repository } from "typeorm";
import { updateConstructorTypeNode } from "typescript";
import { IDbContext } from "./context/IDbContext";
import { IUserRepository } from "./IUserRepository";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly dbcontext: Repository<UserDao>) {
  }

  public async findById(id: UserId): Promise<User | null> {
    const userData = this.dbcontext.findOne(id.value).then(result => {
        if (result == undefined) {
          return null;
        }
        return new User(new UserId(result.id), new UserName(result.name), transferType(result.type))
    });
    return userData;
  }
}
