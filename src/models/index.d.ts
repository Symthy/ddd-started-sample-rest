import { Model, BuildOptions } from 'sequelize';

/* モデルの数作成する */
interface UserModel extends Model {
  readonly id: number;
  name: string;
  type: string;
  readonly created_at: date;
  readonly updated_at: date;
}
interface GroupModel extends Model {
  readonly id: number;
  name: string;
  owner_id: number;
  readonly created_at: date;
  readonly updated_at: date;
}

interface GroupMemberModel extends Model {
  readonly id: number;
  name: string;
  owner_id: number;
  readonly created_at: date;
  readonly updated_at: date;
}

type UserModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
}
type GroupModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): GroupModel;
}
type UserModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): GroupMemberModel;
}
/* --------------- */

interface DBModel {
  member: MemberModelStatic;
}

declare const db: DBModel;
export = db;
