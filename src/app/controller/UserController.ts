import { UserPostRequestModel } from "#/request/UserPostRequestModel";
import { UserRegisterCommand } from "#/service/command/UserRegisterCommand";
import { Body, Delete, Get, Param, Post, Put } from "routing-controllers";
import { UserData } from "../service/dto/UserData";
import { UserDataList } from "../service/dto/UserDataList";
import { UserApplicationService } from "../service/UserApplicationService";

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
