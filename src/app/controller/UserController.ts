import { UserPostRequestModel } from "#/controller/request/UserPostRequestModel";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";
import { UserRegisterCommand } from "#/service/user/command/UserRegisterCommand";
import { UserApplicationService } from "#/service/user/UserApplicationService";
import { Body, Delete, Get, Param, Post, Put } from "routing-controllers";

export class UserController {
  private readonly userApplicationService: UserApplicationService

  public constructor(service: UserApplicationService) {
    this.userApplicationService = service;
  }

  @Get('/users')
  public index(): Promise<UserDataList> {
    return this.userApplicationService.getAll();
  }

  @Get('/users/:id')
  public get(@Param("id") id: number): Promise<UserData | null> {
    const command = new UserGetCommand(id);
    return this.userApplicationService.get(command);
  }

  @Post("/users")
  public post(@Body() user: UserPostRequestModel): void {
    const command = new UserRegisterCommand(user);
    this.userApplicationService.register(command);
  }

  @Put("/users/:id")
  public put(@Param("id") id: number, @Body() user: UserPutRequestModel): void {
    const command = new UserUpdateCommand(id, user.name, user.type);
    this.userApplicationService.update(command);
  }

  @Delete("/users/:id")
  public delete(id: number): void {
    const command = new UserDeleteCommand(id);
    this.userApplicationService.delete(command);
  }
}
