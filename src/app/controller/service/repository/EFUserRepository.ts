import { User } from "app/domain/User";
import { UserId } from "app/domain/UserId";
import { UserName } from "app/domain/UserName";
import { IDbContext } from "./context/IDbContext";
import { IUserRepository } from "./IUserRepository";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly _context: IDbContext) {
  }

  find(id: UserId): User {
    let users: User;
  }
}
