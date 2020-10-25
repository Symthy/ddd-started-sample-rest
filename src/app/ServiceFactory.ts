import Container from "typedi";
import { GroupFactory } from "./domain/factory/GroupFactory";
import { UserFactory } from "./domain/factory/UserFactory";
import { GroupApplicationService } from "./service/group/GroupApplicationService";
import { UserApplicationService } from "./service/user/UserApplicationService";

interface IServiceFactory {
  create(): void;
}

class UserServiceFactory implements IServiceFactory {
  create(): void {
    Container.set('user.service', new UserApplicationService(new UserFactory()));
  }
}

class GroupServiceFactory implements IServiceFactory {
  create(): void {
    Container.set('group.service', new GroupApplicationService(
      new GroupFactory(),
      new UserFactory())
    );
  }
}

export class ServicesFactory implements IServiceFactory {
  private serviceFactories: Array<IServiceFactory> = [];

  constructor() {
    this.serviceFactories.push(Container.get('user.service.factory'));
    this.serviceFactories.push(Container.get('group.service.factory'));
  }

  create(): void {
    this.serviceFactories.forEach(f => f.create());
  }

  static init() {
    Container.set('user.service.factory', new UserServiceFactory());
    Container.set('group.service.factory', new GroupServiceFactory());
    Container.set('services.factory', new ServicesFactory())
  }

}
