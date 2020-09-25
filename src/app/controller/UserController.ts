import { UserGetResponseModel } from "../model/response/UserGetResponseModel";
import { UserApplicationService } from "./service/UserApplicationService";

class UserController {
  private readonly userApplicationService: UserApplicationService

  public constructor(service: UserApplicationService) {
    this.userApplicationService = service;
  }

  public index(): UserIndexResponseModel {
    const result = this.userApplicationService.getAll();
    const users = result.users.map(user => new UserResponseModel(user.id, user.name));
    return new UserIndexResponseModel(users);
  }

  public get(id: string): UserGetResponseModel {
    const command = new UserGetCommand(id);
    const result = this.userApplicationService.get(command);
    return new UserGetResponseModel(result.user);
  }

  public post(request: UserPostRequestModel) {
    return new UserPostResponseModel();
  }

  public put(id: string, request: UserPutRequestModel): void {
  }

  public delete(id: string): void {
  }
}
