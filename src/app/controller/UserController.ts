import { UserPostRequestModel } from "#/controller/request/user/UserPostRequestModel";
import { UserData } from "#/dto/user/UserData";
import { UserDataList } from "#/dto/user/UserDataList";
import { UserRegisterCommand } from "#/service/user/command/UserRegisterCommand";
import { UserApplicationService } from "#/service/user/UserApplicationService";
import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";

@JsonController('/users')
export class UserController {

  @Inject('user.service')
  private readonly _userApplicationService!: UserApplicationService

  @Get('/')
  public index(): Promise<UserDataList> {
    return this._userApplicationService.getAll();
  }

  @Get('/:id')
  public get(@Param("id") id: number): Promise<UserData | null> {
    const command = new UserGetCommand(id);
    return this._userApplicationService.get(command);
  }

  @Post('/')
  public post(@Body() user: UserPostRequestModel): void {
    const command = new UserRegisterCommand(user);
    this._userApplicationService.register(command);
  }

  @Put('/:id')
  public put(@Param('id') id: number, @Body() user: UserPutRequestModel): void {
    const command = new UserUpdateCommand(id, user.name, user.type);
    this._userApplicationService.update(command);
  }

  @Delete("/:id")
  public delete(@Param('id') id: number): void {
    const command = new UserDeleteCommand(id);
    this._userApplicationService.delete(command);
  }
}
