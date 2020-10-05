import { UserData } from "./service/dto/UserData";
import { UserDataList } from "./service/dto/UserDataList";
import { UserApplicationService } from "./service/UserApplicationService";

export class UserController {
  private readonly userApplicationService: UserApplicationService

  public constructor(service: UserApplicationService) {
    this.userApplicationService = service;
  }

  public index(): Promise<UserDataList> {
    return this.userApplicationService.getAll();
  }

  public get(id: number): Promise<UserData | null> {
    const command = new UserGetCommand(id);
    return this.userApplicationService.get(command);
  }

  public post(request: UserPostRequestModel) {
  }

  public put(id: string, request: UserPutRequestModel): void {
  }

  public delete(id: string): void {
  }
}
