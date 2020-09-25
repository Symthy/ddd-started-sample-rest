import { User } from "app/domain/User";
import { UserId } from "app/domain/UserId";
import { IUserRepository } from "./IUserRepository";

class EFUserRepository implements IUserRepository {

  public constructor(private readonly _context: DBContext) {
  }

  find(id: UserId): User {
    let users: User;
  }
}
