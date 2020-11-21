import { UserModel } from '#/db/entity/UserModel';
import {
  Factory,
  Seeder,
} from 'typeorm-seeding';

export class UsersSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(UserModel)().create()
  }
}
