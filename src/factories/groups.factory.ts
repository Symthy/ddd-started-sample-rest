import * as Faker from 'faker';
import { GroupModel } from "#/db/entity/GroupModel"
import { define } from "typeorm-seeding"

define(GroupModel, (faker: typeof Faker) => {
  const group = new GroupModel()
  group.name = `${faker.random.word()} Group`;
  return group;
})
