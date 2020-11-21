import * as Faker from 'faker';
import { UserModel } from "#/db/entity/UserModel"
import { define } from "typeorm-seeding"
import { UserTypes } from '#/domain/model/user/UserType';

define(UserModel, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)

  const user = new UserModel()
  user.name = `${firstName} ${lastName}`
  user.type = faker.random.arrayElement(Object.values(UserTypes));
  return user
})
