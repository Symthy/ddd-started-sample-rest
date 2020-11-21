import { GroupModel } from '#/db/entity/GroupModel';
import { UserModel } from '#/db/entity/UserModel';
import { Connection } from 'typeorm';
import {
  Factory,
  Seeder,
} from 'typeorm-seeding';

export class GroupSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    for (let i = 0; i < 2; i++) {
      const user = await factory(UserModel)().create();
      const members = await factory(UserModel)().
        createMany(2);

      await factory(GroupModel)()
        .map(async group => {
          group.owner = user;
          group.members = members;
          return group;
        })
        .create()
    }
  }
}
