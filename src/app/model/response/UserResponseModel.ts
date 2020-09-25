import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";

export class UserResponseModel {
  public constructor(private id: UserId, private name: UserName) {
  }
}
